import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';

const AUTO_MS = 7000;
const SWIPE_PX = 56;

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  return reduced;
}

export function useCarousel(length: number, intervalMs = AUTO_MS) {
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const rootRef = useRef<HTMLElement | null>(null);
  const inViewRef = useRef(true);
  const progressRef = useRef(0);
  const pointerStartX = useRef<number | null>(null);
  const pointerIdRef = useRef<number | null>(null);

  useEffect(() => {
    setIndex((current) => {
      if (length < 1) return 0;
      return current < length ? current : 0;
    });
    progressRef.current = 0;
    setProgress(0);
  }, [length]);

  useEffect(() => {
    setIsPlaying(!reducedMotion && length > 1);
  }, [reducedMotion, length]);

  const next = useCallback(() => {
    if (length < 2) return;
    setDirection(1);
    setIndex((current) => (current + 1) % length);
    progressRef.current = 0;
    setProgress(0);
  }, [length]);

  const prev = useCallback(() => {
    if (length < 2) return;
    setDirection(-1);
    setIndex((current) => (current - 1 + length) % length);
    progressRef.current = 0;
    setProgress(0);
  }, [length]);

  const goTo = useCallback(
    (nextIndex: number) => {
      if (length < 1) return;
      const normalized = ((nextIndex % length) + length) % length;
      setDirection(normalized >= index ? 1 : -1);
      setIndex(normalized);
      progressRef.current = 0;
      setProgress(0);
    },
    [index, length],
  );

  const toggle = useCallback(() => {
    if (length < 2 || reducedMotion) return;
    setIsPlaying((current) => !current);
  }, [length, reducedMotion]);

  const shouldRun = isPlaying && !isHovering && !reducedMotion && length > 1;

  useEffect(() => {
    if (!shouldRun) return;

    let frame = 0;
    let last = performance.now();
    let elapsed = progressRef.current * intervalMs;

    const tick = (now: number) => {
      if (!inViewRef.current || document.hidden) {
        last = now;
        frame = requestAnimationFrame(tick);
        return;
      }

      elapsed += now - last;
      last = now;
      const nextProgress = Math.min(elapsed / intervalMs, 1);
      progressRef.current = nextProgress;
      setProgress(nextProgress);

      if (nextProgress >= 1) {
        progressRef.current = 0;
        next();
        return;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [shouldRun, intervalMs, index, next]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry?.isIntersecting ?? true;
      },
      { threshold: 0.28 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const onPointerEnter = useCallback(() => setIsHovering(true), []);
  const onPointerLeave = useCallback(() => setIsHovering(false), []);

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    const target = event.target;
    if (target instanceof Element && target.closest('a, button')) return;
    pointerStartX.current = event.clientX;
    pointerIdRef.current = event.pointerId;
  }, []);

  const onPointerUp = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (pointerIdRef.current !== event.pointerId) return;
      const startX = pointerStartX.current;
      pointerStartX.current = null;
      pointerIdRef.current = null;
      if (startX === null) return;

      const delta = event.clientX - startX;
      if (delta > SWIPE_PX) prev();
      else if (delta < -SWIPE_PX) next();
    },
    [next, prev],
  );

  const onKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLElement>) => {
      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault();
          next();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          prev();
          break;
        case 'Home':
          event.preventDefault();
          goTo(0);
          break;
        case 'End':
          event.preventDefault();
          goTo(length - 1);
          break;
        case ' ':
          event.preventDefault();
          toggle();
          break;
        default:
          break;
      }
    },
    [goTo, length, next, prev, toggle],
  );

  return {
    index,
    direction,
    progress,
    isPlaying,
    reducedMotion,
    rootRef,
    goTo,
    next,
    prev,
    toggle,
    onPointerEnter,
    onPointerLeave,
    onPointerDown,
    onPointerUp,
    onKeyDown,
  };
}
