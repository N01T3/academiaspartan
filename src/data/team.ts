import type { TeamMember } from '@/types'

export const team: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Ricardo Almeida',
    role: 'Treinador Chefe · Bodybuilding',
    bio: 'Atleta com mais de 15 anos de competição, especialista em preparação para campeonatos e hipertrofia avançada.',
    credentials: ['CREF 012345-G/SP', 'Cert. IFBB Pro Prep', 'Nutrição Esportiva'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'team-2',
    name: 'Mariana Costa',
    role: 'Nutricionista Esportiva',
    bio: 'Mestra em nutrição esportiva, monta planos alimentares para atletas de fisiculturismo e alta performance.',
    credentials: ['CRN 56789/SP', 'MSc Nutrição Esportiva', 'ISSA Nutrition'],
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'team-3',
    name: 'Carlos Mendes',
    role: 'Preparador Físico',
    bio: 'Focado em força e condicionamento, trabalha a base atlética de atletas de força e fisiculturistas.',
    credentials: ['CREF 334455-RJ/SP', 'Cert. NSCA-CSCS', 'CrossFit L2'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'team-4',
    name: 'Juliana Rocha',
    role: 'Treinadora · Musculação',
    bio: 'Especialista em treinamento feminino e recomposição corporal, do iniciante ao avançado.',
    credentials: ['CREF 998877-G/SP', 'Cert. Musculação Avançada', 'Pós-grad. Fisiologia'],
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
  },
]
