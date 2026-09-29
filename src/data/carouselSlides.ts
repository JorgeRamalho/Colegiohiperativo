export const CAROUSEL_CATEGORIES = [
  'sala',
  'esportes',
  'artes',
  'ciencias',
  'computacao',
  'idiomas',
] as const;

export type CarouselCategory = (typeof CAROUSEL_CATEGORIES)[number];

export interface CarouselSlide {
  id: string;
  category: CarouselCategory;
  title: string;
  subtitle: string;
  photoId: string;
  imageAlt: string;
  ctaLabel: string;
  ctaTo: string;
}

export const CATEGORY_META: Record<
  CarouselCategory,
  { label: string; kicker: string }
> = {
  sala: { label: 'Sala de aula', kicker: 'Aprendizado ativo' },
  esportes: { label: 'Esportes', kicker: 'Corpo e mente' },
  artes: { label: 'Artes', kicker: 'Expressão criativa' },
  ciencias: { label: 'Ciências', kicker: 'Descoberta e método' },
  computacao: { label: 'Computação', kicker: 'Futuro digital' },
  idiomas: { label: 'Idiomas', kicker: 'Mundo sem fronteiras' },
};

export function categoryLabel(category: CarouselCategory): string {
  switch (category) {
    case 'sala':
      return CATEGORY_META.sala.label;
    case 'esportes':
      return CATEGORY_META.esportes.label;
    case 'artes':
      return CATEGORY_META.artes.label;
    case 'ciencias':
      return CATEGORY_META.ciencias.label;
    case 'computacao':
      return CATEGORY_META.computacao.label;
    case 'idiomas':
      return CATEGORY_META.idiomas.label;
    default: {
      const exhaustive: never = category;
      return exhaustive;
    }
  }
}

export function carouselImageSrc(photoId: string, width: number): string {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=80`;
}

export function carouselSrcSet(photoId: string): string {
  return [960, 1440, 1920]
    .map((width) => `${carouselImageSrc(photoId, width)} ${width}w`)
    .join(', ');
}

export const CAROUSEL_SLIDES: readonly CarouselSlide[] = [
  {
    id: 'sala-anos-iniciais',
    category: 'sala',
    title: 'Salas que despertam curiosidade',
    subtitle:
      'Metodologia ativa, turmas acompanhadas de perto e um ambiente pensado para cada fase da infância.',
    photoId: 'photo-1509062522246-3755977927d7',
    imageAlt: 'Crianças estudando em sala de aula com a professora à frente',
    ctaLabel: 'Conhecer os cursos',
    ctaTo: '/cursos',
  },
  {
    id: 'sala-estudo-colaborativo',
    category: 'sala',
    title: 'Estudar juntos muda o resultado',
    subtitle:
      'Projetos em grupo, debate e mediação docente para formar autonomia e pensamento crítico.',
    photoId: 'photo-1523240795612-9a054b0db644',
    imageAlt: 'Grupo de estudantes colaborando em volta de uma mesa de estudos',
    ctaLabel: 'Conhecer os cursos',
    ctaTo: '/cursos',
  },
  {
    id: 'sala-ensino-medio',
    category: 'sala',
    title: 'Foco no vestibular e no futuro',
    subtitle:
      'Ensino Médio com preparação para ENEM, vestibular e escolhas profissionais conscientes.',
    photoId: 'photo-1577896851231-70ef18881754',
    imageAlt: 'Estudantes adolescentes concentrados em sala de aula',
    ctaLabel: 'Ver trajetórias',
    ctaTo: '/cursos',
  },
  {
    id: 'sala-aula-magna',
    category: 'sala',
    title: 'Do colégio à graduação, no mesmo campus',
    subtitle:
      'Auditórios, seminários e aulas expositivas que conectam a educação básica ao ensino superior.',
    photoId: 'photo-1524178232363-1fb2b075b655',
    imageAlt: 'Auditório com estudantes assistindo a uma aula magna',
    ctaLabel: 'Ver graduação',
    ctaTo: '/cursos',
  },
  {
    id: 'esportes-futebol',
    category: 'esportes',
    title: 'Futebol society com espírito de equipe',
    subtitle:
      'Tática, amizade e alto rendimento — o esporte como extensão da formação integral.',
    photoId: 'photo-1574629810360-7efbbe195018',
    imageAlt: 'Jogadores de futebol em partida competitiva no gramado',
    ctaLabel: 'Ver esportes',
    ctaTo: '/esportes',
  },
  {
    id: 'esportes-basquete',
    category: 'esportes',
    title: 'Basquete que treina agilidade e estratégia',
    subtitle:
      'Quadras, jogos internos e acompanhamento tático para quem quer ir além da recreação.',
    photoId: 'photo-1546519638-68e109498ffc',
    imageAlt: 'Jogador de basquete lançando a bola à cesta durante partida',
    ctaLabel: 'Ver esportes',
    ctaTo: '/esportes',
  },
  {
    id: 'esportes-natacao',
    category: 'esportes',
    title: 'Natação para corpo, respiração e disciplina',
    subtitle:
      'Piscina e condicionamento aquático em uma das sete modalidades do centro esportivo.',
    photoId: 'photo-1530549387789-4c1017266635',
    imageAlt: 'Nadador em treino de alta performance na piscina',
    ctaLabel: 'Ver esportes',
    ctaTo: '/esportes',
  },
  {
    id: 'esportes-artes-marciais',
    category: 'esportes',
    title: 'Karatê e judô: respeito em cada movimento',
    subtitle:
      'Artes marciais que desenvolvem foco, autocontrole e valores que atravessam a vida escolar.',
    photoId: 'photo-1555597673-b21d5c935865',
    imageAlt: 'Praticantes de karatê em treino no tatame',
    ctaLabel: 'Ver esportes',
    ctaTo: '/esportes',
  },
  {
    id: 'artes-pintura',
    category: 'artes',
    title: 'Ateliê de artes visuais',
    subtitle:
      'Pintura, cor e composição para os alunos experimentarem linguagens e construírem repertório estético.',
    photoId: 'photo-1513364776144-60967b0f800f',
    imageAlt: 'Pincéis e paleta de tintas em ateliê de artes',
    ctaLabel: 'Conhecer o colégio',
    ctaTo: '/sobre',
  },
  {
    id: 'artes-musica',
    category: 'artes',
    title: 'Música que forma sensibilidade',
    subtitle:
      'Prática instrumental, apreciação e performance — a arte como parte da jornada acadêmica.',
    photoId: 'photo-1508807526345-15e9b5f4eaff',
    imageAlt: 'Músico tocando violino em apresentação',
    ctaLabel: 'Conhecer o colégio',
    ctaTo: '/sobre',
  },
  {
    id: 'artes-teatro',
    category: 'artes',
    title: 'Palco, presença e comunicação',
    subtitle:
      'Teatro e expressão corporal para desenvolver voz, empatia e confiança em público.',
    photoId: 'photo-1503095396549-807759245b35',
    imageAlt: 'Palco de teatro iluminado preparado para apresentação',
    ctaLabel: 'Conhecer o colégio',
    ctaTo: '/sobre',
  },
  {
    id: 'ciencias-quimica',
    category: 'ciencias',
    title: 'Laboratório de química',
    subtitle:
      'Experimentos reais, segurança e método científico desde os anos finais até a graduação.',
    photoId: 'photo-1532094349884-543bc11b234d',
    imageAlt: 'Laboratório de ciências com vidrarias e equipamentos de química',
    ctaLabel: 'Ver cursos',
    ctaTo: '/cursos',
  },
  {
    id: 'ciencias-pesquisa',
    category: 'ciencias',
    title: 'Pesquisa que começa cedo',
    subtitle:
      'Hipótese, observação e registro — a ciência como hábito, não só como disciplina.',
    photoId: 'photo-1532187643603-ba119ca4109e',
    imageAlt: 'Cientista em laboratório analisando amostras em ambiente de pesquisa',
    ctaLabel: 'Ver cursos',
    ctaTo: '/cursos',
  },
  {
    id: 'ciencias-biologia',
    category: 'ciencias',
    title: 'Biologia e investigação de perto',
    subtitle:
      'Microscopia, campo e projetos STEM para quem quer entender a vida com rigor e encantamento.',
    photoId: 'photo-1582719471384-894fbb16e074',
    imageAlt: 'Laboratório de biologia com equipamentos de pesquisa e bancada',
    ctaLabel: 'Ver cursos',
    ctaTo: '/cursos',
  },
  {
    id: 'computacao-lab',
    category: 'computacao',
    title: 'Sala de computação conectada',
    subtitle:
      'Laboratórios modernos para informática, programação e letramento digital em todas as idades.',
    photoId: 'photo-1516321318423-f06f85e504b3',
    imageAlt: 'Estudantes utilizando computadores em laboratório de informática',
    ctaLabel: 'Ver cursos técnicos',
    ctaTo: '/cursos',
  },
  {
    id: 'computacao-colaboracao',
    category: 'computacao',
    title: 'Tecnologia em colaboração',
    subtitle:
      'Trabalho em equipe, resolução de problemas e ferramentas que preparam para o mercado 4.0.',
    photoId: 'photo-1531482615713-2afd69097998',
    imageAlt: 'Grupo de estudantes colaborando em laptops em ambiente tecnológico',
    ctaLabel: 'Ver cursos técnicos',
    ctaTo: '/cursos',
  },
  {
    id: 'computacao-robotica',
    category: 'computacao',
    title: 'Robótica e pensamento computacional',
    subtitle:
      'Da lógica de programação à prototipagem — inovação com as mãos na massa.',
    photoId: 'photo-1581092918056-0c4c3acd3789',
    imageAlt: 'Projeto de robótica e eletrônica em bancada de laboratório maker',
    ctaLabel: 'Ver cursos técnicos',
    ctaTo: '/cursos',
  },
  {
    id: 'idiomas-biblioteca',
    category: 'idiomas',
    title: 'Biblioteca e repertório de mundo',
    subtitle:
      'Leitura, pesquisa e acervo para ampliar vocabulário, cultura e imaginação.',
    photoId: 'photo-1524995997946-a1c2e315a42f',
    imageAlt: 'Estante de biblioteca com livros em ambiente de estudo',
    ctaLabel: 'Falar conosco',
    ctaTo: '/contato',
  },
  {
    id: 'idiomas-aula',
    category: 'idiomas',
    title: 'Idiomas com prática real',
    subtitle:
      'Aulas comunicativas de línguas para estudar, viajar e se conectar com outras culturas.',
    photoId: 'photo-1546410531-bb4caa6b424d',
    imageAlt: 'Professora ensinando em lousa durante aula de idiomas',
    ctaLabel: 'Falar conosco',
    ctaTo: '/contato',
  },
  {
    id: 'idiomas-imersao',
    category: 'idiomas',
    title: 'Imersão, conversação e fluência',
    subtitle:
      'Escuta, fala e escrita em contextos vivos — o idioma como ferramenta de cidadania global.',
    photoId: 'photo-14565130808-af98c95e9980',
    imageAlt: 'Estudante lendo e fazendo anotações em sessão de estudos de idiomas',
    ctaLabel: 'Falar conosco',
    ctaTo: '/contato',
  },
];
