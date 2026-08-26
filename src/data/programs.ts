import type { Program } from '@/types'

export const programs: Program[] = [
  {
    id: 'prog-1',
    title: 'Bodybuilding',
    tag: 'Diferencial',
    description:
      'Preparação completa para campeonatos: periodização, posing, dieta e acompanhamento individualizado com atletas que competem em alto nível.',
    image: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=800&auto=format&fit=crop',
    features: [
      'Periodização de hipertrofia',
      'Preparação pré-competição',
      'Ajuste de posing',
      'Suporte nutricional',
    ],
  },
  {
    id: 'prog-2',
    title: 'Musculação',
    tag: 'Todos os níveis',
    description:
      'Treinos estruturados para ganho de força e massa muscular, com acompanhamento de treinadores e fichas personalizadas.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
    features: ['Fichas personalizadas', 'Avaliação física', 'Acompanhamento mensal', 'Treinos em grupo'],
  },
  {
    id: 'prog-3',
    title: 'Atletismo de Força',
    tag: 'Performance',
    description:
      'Powerlifting e strongman com foco em força máxima, técnica de levantamento e progressão de cargas segura.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop',
    features: ['Técnica de levantamento', 'Ciclos de força', 'Análise de vídeo', 'Competições internas'],
  },
  {
    id: 'prog-4',
    title: 'Condicionamento',
    tag: 'Saúde',
    description:
      'Treinos de alta intensidade e condicionamento cardiovascular para quem busca performance e qualidade de vida.',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop',
    features: ['HIIT', 'Circuito funcional', 'Mobilidade', 'Emagrecimento'],
  },
]
