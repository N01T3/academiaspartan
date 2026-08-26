import type { Plan, Transaction } from '@/types'

export const transactions: Transaction[] = [
  {
    id: 'tx-1',
    description: 'Mensalidade — Plano Premium',
    category: 'Mensalidades',
    amount: 199.9,
    type: 'income',
    date: '2026-08-01',
  },
  {
    id: 'tx-2',
    description: 'Mensalidade — Plano Básico',
    category: 'Mensalidades',
    amount: 99.9,
    type: 'income',
    date: '2026-08-01',
  },
  {
    id: 'tx-3',
    description: 'Manutenção de equipamentos',
    category: 'Operacional',
    amount: 1200,
    type: 'expense',
    date: '2026-08-05',
  },
  {
    id: 'tx-4',
    description: 'Assessoria de competição',
    category: 'Serviços',
    amount: 450,
    type: 'income',
    date: '2026-08-08',
  },
  {
    id: 'tx-5',
    description: 'Energia elétrica',
    category: 'Operacional',
    amount: 890.5,
    type: 'expense',
    date: '2026-08-10',
  },
  {
    id: 'tx-6',
    description: 'Suplementos — revenda',
    category: 'Vendas',
    amount: 320,
    type: 'income',
    date: '2026-08-12',
  },
]

export const plans: Plan[] = [
  { id: 'plan-1', name: 'Básico', price: 99.9, period: 'mensal', active: true },
  { id: 'plan-2', name: 'Premium', price: 199.9, period: 'mensal', active: true },
  { id: 'plan-3', name: 'Atleta', price: 299.9, period: 'mensal', active: true },
  { id: 'plan-4', name: 'Anual', price: 999.9, period: 'anual', active: false },
]
