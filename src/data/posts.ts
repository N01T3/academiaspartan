import type { BlogPost } from '@/types'

export const posts: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'periodizacao-para-hipertrofia',
    title: 'Periodização para hipertrofia: o guia completo',
    excerpt:
      'Entenda como estruturar seus treinos em ciclos para maximizar o ganho de massa muscular e evitar platôs.',
    category: 'Treinamento',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=900&auto=format&fit=crop',
    author: 'Ricardo Almeida',
    publishedAt: '2026-08-10',
    published: true,
    content:
      'A periodização é a base de qualquer programa de hipertrofia bem-sucedido. Neste artigo você aprende a dividir o treino em mesociclos, controlar volume e intensidade e reconhecer o momento certo de deload.\n\nComece definindo um objetivo claro e um período de 8 a 12 semanas. A cada semana, aumente progressivamente a carga ou o volume, respeitando a recuperação.\n\nPor fim, avalie semanalmente sua evolução e ajuste as variáveis conforme necessário.',
  },
  {
    id: 'post-2',
    slug: 'nutricao-pre-competicao',
    title: 'Nutrição pré-competição para atletas',
    excerpt:
      'O que comer na semana do campeonato: estratégias de carboidrato, hidratação e timing alimentar.',
    category: 'Nutrição',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=900&auto=format&fit=crop',
    author: 'Mariana Costa',
    publishedAt: '2026-08-03',
    published: true,
    content:
      'A semana que antecede uma competição é decisiva. O manejo de carboidratos, sódio e água deve ser individualizado e testado antes do evento.\n\nEvite mudanças drásticas de última hora e priorize alimentos de fácil digestão.\n\nTrabalhe sempre com um nutricionista esportivo para garantir segurança e performance.',
  },
  {
    id: 'post-3',
    slug: 'strength-training-para-iniciantes',
    title: 'Strength training para iniciantes',
    excerpt: 'Os fundamentos do treino de força: padrões de movimento, carga progressiva e frequência ideal.',
    category: 'Treinamento',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=900&auto=format&fit=crop',
    author: 'Carlos Mendes',
    publishedAt: '2026-07-22',
    published: true,
    content:
      'Começar no treino de força não precisa ser complicado. Foque nos padrões básicos: agachar, empurrar, puxar, dobrar o quadril e carregar.\n\nProgrida a carga de forma gradual e respeite a técnica antes de aumentar a intensidade.\n\nTreine de 3 a 4 vezes por semana com descanso adequado entre as sessões.',
  },
  {
    id: 'post-4',
    slug: 'recuperacao-e-sono',
    title: 'Recuperação e sono: o segredo do progresso',
    excerpt: 'Por que dormir bem é tão importante quanto treinar, e como otimizar sua recuperação muscular.',
    category: 'Saúde',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=900&auto=format&fit=crop',
    author: 'Juliana Rocha',
    publishedAt: '2026-07-10',
    published: false,
    content:
      'O músculo cresce no descanso, não no treino. Um sono de qualidade é o principal fator de recuperação.\n\nPriorize de 7 a 9 horas por noite, mantenha horários regulares e reduza o estresse.\n\nComplemente com estratégias de relaxamento e uma rotina de sono consistente.',
  },
]
