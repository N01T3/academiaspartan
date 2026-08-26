import type { ErpModule } from '@/types'

export const erpModules: ErpModule[] = [
  {
    id: 'erp-1',
    name: 'Financeiro',
    description: 'Faturamento, contas a pagar/receber e conciliação bancária.',
    enabled: true,
    integrationUrl: '',
  },
  {
    id: 'erp-2',
    name: 'Agenda & Aulas',
    description: 'Agendamento de aulas, check-in de alunos e gestão de turmas.',
    enabled: false,
    integrationUrl: '',
  },
  {
    id: 'erp-3',
    name: 'Controle de Acesso',
    description: 'Catracas, biometria e controle de presença dos alunos.',
    enabled: true,
    integrationUrl: '',
  },
  {
    id: 'erp-4',
    name: 'Estoque & Suplementos',
    description: 'Controle de estoque da loja e reposição de suplementos.',
    enabled: false,
    integrationUrl: '',
  },
  {
    id: 'erp-5',
    name: 'CRM de Alunos',
    description: 'Gestão de relacionamento, matrículas e retenção de alunos.',
    enabled: true,
    integrationUrl: '',
  },
]
