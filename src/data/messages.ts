import type { ContactMessage } from '@/types'

export const messages: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'João Pedro',
    email: 'joao@email.com',
    phone: '(11) 98888-1111',
    subject: 'Aula experimental',
    message: 'Gostaria de agendar uma aula grátis para conhecer a estrutura.',
    read: false,
    createdAt: '2026-08-20T14:30:00.000Z',
  },
  {
    id: 'msg-2',
    name: 'Camila R.',
    email: 'camila@email.com',
    phone: '(11) 97777-2222',
    subject: 'Planos para atleta',
    message: 'Tenho interesse no programa de bodybuilding. Quais os valores?',
    read: true,
    createdAt: '2026-08-18T10:00:00.000Z',
  },
]
