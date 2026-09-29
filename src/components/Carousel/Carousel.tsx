import { useEffect, useId, useMemo, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  CAROUSEL_CATEGORIES,
  CAROUSEL_SLIDES,
  CATEGORY_META,
  carouselImageSrc,
  carouselSrcSet,
  categoryLabel,
  type CarouselCategory,
} from '../../data/carouselSlides';
import { useCarousel } from '../../hooks/useCarousel';
import './Carousel.css';

type FilterId = 'all' | CarouselCategory;

function IconChevron({ dir }: { dir: 'prev' | 'next' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {dir === 'prev' ? (
        <path d="M15.2 5.3a1 1 0 0 1 .05 1.4L10.83 12l4.42 5.3a1 1 0 1 1-1.5 1.32l-5-6a1 1 0 0 1 0-1.24l5-6a1 1 0 0 1 1.45-.08Z" />
      ) : (
        <path d="M8.8 5.3a1 1 0 0 1 1.45.08l5 6a1 1 0 0 1 0 1.24l-5 6a1 1 0 1 1-1.5-1.32L13.17 12 8.75 6.7A1 1 0 0 1 8.8 5.3Z" />
      )}
    </svg>
  );
}

function IconPlayPause({ playing }: { playing: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {playing ? (
        <path d="M8 6.2A1.2 1.2 0 0 1 9.2 5h1.6A1.2 1.2 0 0 1 12 6.2v11.6A1.2 1.2 0 0 1 10.8 19H9.2A1.2 1.2 0 0 1 8 17.8V6.2Zm5.2 0A1.2 1.2 0 0 1 14.4 5h1.6A1.2 1.2 0 0 1 17.2 6.2v11.6a1.2 1.2 0 0 1-1.2 1.2h-1.6a1.2 1.2 0 0 1-1.2-1.2V6.2Z" />
      ) : (
        <path d="M8.2 5.15a1 1 0 0 1 1.02.05l9.2 5.85a1 1 0 0 1 0 1.7l-9.2 5.85A1 1 0 0 1 7.5 17.85V6.15a1 1 0 0 1 .7-1Z" />
      )}
    </svg>
  );
}

export default function CampusCarousel() {
  const [filter, setFilter] = useState<FilterId>('all');
  const [loadedIds, setLoadedIds] = useState<Set<string>>(() => new Set());
  const labelId = useId();
  const filmstripRef = useRef<HTMLDivElement | null>(null);

  const slides = useMemo(
    () =>
      filter === 'all'
        ? [...CAROUSEL_SLIDES]
        : CAROUSEL_SLIDES.filter((slide) => slide.category === filter),
    [filter],
  );

  const carousel = useCarousel(slides.length);
  const {
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
  } = carousel;

  const active = slides[index] ?? slides[0];
  const prevIndex = slides.length > 1 ? (index - 1 + slides.length) % slides.length : index;
  const nextIndex = slides.length > 1 ? (index + 1) % slides.length : index;

  useEffect(() => {
    const activeThumb = filmstripRef.current?.querySelector<HTMLButtonElement>(
      '[data-active="true"]',
    );
    activeThumb?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [index, filter]);

  useEffect(() => {
    if (!active) return;
    const nearby = [index, prevIndex, nextIndex];
    nearby.forEach((slideIndex) => {
      const slide = slides[slideIndex];
      if (!slide) return;
      const preload = new Image();
      preload.src = carouselImageSrc(slide.photoId, 1440);
    });
  }, [active, index, nextIndex, prevIndex, slides]);

  if (!active) return null;

  const imageReady = loadedIds.has(active.id);

  function handleSpotMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    event.currentTarget.style.setProperty('--spot-x', `${x}%`);
    event.currentTarget.style.setProperty('--spot-y', `${y}%`);
  }

  return (
    <section
      ref={rootRef}
      className={`campus-carousel${imageReady ? ' campus-carousel--ready' : ''}`}
      aria-roledescription="carrossel"
      aria-labelledby={labelId}
      tabIndex={0}
      data-direction={direction === 1 ? 'next' : 'prev'}
      style={{ '--carousel-progress': progress } as CSSProperties}
      onKeyDown={onKeyDown}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerMove={handleSpotMove}
    >
      <div className="campus-carousel__atmosphere" aria-hidden="true" />
      <div className="campus-carousel__scan" aria-hidden="true" />

      <div
        className="campus-carousel__viewport"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="campus-carousel__frame">
          {slides.map((slide, slideIndex) => {
            const isActive = slideIndex === index;
            const isNear =
              slideIndex === index || slideIndex === prevIndex || slideIndex === nextIndex;
            if (!isNear && !loadedIds.has(slide.id)) return null;

            return (
              <figure
                key={slide.id}
                className={`campus-carousel__media${isActive ? ' is-active' : ''}`}
                aria-hidden={!isActive}
                style={{
                  backgroundImage: `url(${carouselImageSrc(slide.photoId, 240)})`,
                }}
              >
                <img
                  src={carouselImageSrc(slide.photoId, 1440)}
                  srcSet={carouselSrcSet(slide.photoId)}
                  sizes="100vw"
                  alt={isActive ? slide.imageAlt : ''}
                  width={1920}
                  height={1080}
                  loading={slideIndex === 0 ? 'eager' : 'lazy'}
                  fetchPriority={isActive ? 'high' : 'low'}
                  decoding="async"
                  draggable={false}
                  onLoad={() => {
                    setLoadedIds((current) => {
                      if (current.has(slide.id)) return current;
                      const nextSet = new Set(current);
                      nextSet.add(slide.id);
                      return nextSet;
                    });
                  }}
                />
              </figure>
            );
          })}

          <div className="campus-carousel__veil" aria-hidden="true" />
          <div className="campus-carousel__spot" aria-hidden="true" />
          <div className="campus-carousel__hud-corners" aria-hidden="true" />
        </div>

        <div className="campus-carousel__copy">
          <p className="campus-carousel__eyebrow" id={labelId}>
            Vida no campus
          </p>
          <span className="campus-carousel__chip">{categoryLabel(active.category)}</span>
          <p className="campus-carousel__kicker">{CATEGORY_META[active.category].kicker}</p>
          <h2 className="campus-carousel__title">{active.title}</h2>
          <p className="campus-carousel__subtitle">{active.subtitle}</p>
          <Link to={active.ctaTo} className="campus-carousel__cta">
            {active.ctaLabel}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <button
          type="button"
          className="campus-carousel__nav campus-carousel__nav--prev"
          onClick={prev}
          aria-label="Slide anterior"
        >
          <IconChevron dir="prev" />
        </button>
        <button
          type="button"
          className="campus-carousel__nav campus-carousel__nav--next"
          onClick={next}
          aria-label="Próximo slide"
        >
          <IconChevron dir="next" />
        </button>

        <div className="campus-carousel__timer" aria-hidden="true" />
      </div>

      <div className="campus-carousel__chrome">
        <div className="campus-carousel__chrome-top">
          <div className="campus-carousel__filters" role="tablist" aria-label="Filtrar por área">
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'all'}
              className={`campus-carousel__filter${filter === 'all' ? ' is-active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Todos
            </button>
            {CAROUSEL_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={filter === category}
                className={`campus-carousel__filter${filter === category ? ' is-active' : ''}`}
                onClick={() => setFilter(category)}
              >
                {categoryLabel(category)}
              </button>
            ))}
          </div>

          <div className="campus-carousel__meta">
            <span className="campus-carousel__counter" aria-live="polite">
              {String(index + 1).padStart(2, '0')}
              <span> / {String(slides.length).padStart(2, '0')}</span>
            </span>
            <button
              type="button"
              className="campus-carousel__play"
              onClick={toggle}
              disabled={reducedMotion || slides.length < 2}
              aria-label={isPlaying ? 'Pausar apresentação' : 'Retomar apresentação'}
            >
              <span
                className="campus-carousel__play-ring"
                style={{
                  background: `conic-gradient(var(--color-secondary) ${progress * 360}deg, rgba(255,255,255,0.18) 0deg)`,
                }}
              />
              <IconPlayPause playing={isPlaying} />
            </button>
          </div>
        </div>

        <div
          className="campus-carousel__filmstrip"
          ref={filmstripRef}
          role="tablist"
          aria-label="Selecionar imagem"
        >
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              data-active={slideIndex === index ? 'true' : 'false'}
              aria-selected={slideIndex === index}
              aria-label={`${categoryLabel(slide.category)}: ${slide.title}`}
              className={`campus-carousel__thumb${slideIndex === index ? ' is-active' : ''}`}
              onClick={() => goTo(slideIndex)}
            >
              <img
                src={carouselImageSrc(slide.photoId, 320)}
                alt=""
                width={160}
                height={90}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
              <span>{categoryLabel(slide.category)}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
