import type { AdminUser } from '@/types'

export const users: AdminUser[] = [
  {
    id: 'user-1',
    name: 'Administrador',
    email: 'admin@academiaspartan.com.br',
    username: 'admin',
    password: 'spartan123',
    role: 'admin',
    active: true,
  },
  {
    id: 'user-2',
    name: 'Editor de Conteúdo',
    email: 'editor@academiaspartan.com.br',
    username: 'editor',
    password: 'editor123',
    role: 'editor',
    active: true,
  },
]
