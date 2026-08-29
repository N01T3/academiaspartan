import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useContentStore } from '@/store/content'
import { useUsersStore } from '@/store/users'
import { useFinanceStore } from '@/store/finance'
import { useErpStore } from '@/store/erp'
import { useAuthStore } from '@/store/auth'

describe('stores', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  describe('useContentStore', () => {
    it('carrega os seeds iniciais', () => {
      const store = useContentStore()
      expect(store.team).toHaveLength(4)
      expect(store.programs).toHaveLength(4)
      expect(store.posts).toHaveLength(4)
      expect(store.testimonials).toHaveLength(3)
      expect(store.gallery).toHaveLength(6)
      expect(store.config.hours).toHaveLength(3)
    })

    it('addTeam faz unshift e persiste', () => {
      const store = useContentStore()
      const before = store.team.length
      store.addTeam({ name: 'Novo Membro', role: 'Treinador', bio: 'bio', image: 'img', credentials: [] })
      expect(store.team).toHaveLength(before + 1)
      expect(store.team[0].name).toBe('Novo Membro')
      const persisted = JSON.parse(localStorage.getItem('spartan.team') as string)
      expect(persisted[0].name).toBe('Novo Membro')
    })

    it('updateTeam atualiza um membro', () => {
      const store = useContentStore()
      const id = store.team[0].id
      store.updateTeam(id, { name: 'Atualizado' })
      expect(store.team.find((t) => t.id === id)?.name).toBe('Atualizado')
    })

    it('removeTeam remove um membro', () => {
      const store = useContentStore()
      const id = store.team[0].id
      store.removeTeam(id)
      expect(store.team.find((t) => t.id === id)).toBeUndefined()
    })
  })

  describe('useFinanceStore', () => {
    it('calcula totalIncome, totalExpense e balance', () => {
      const store = useFinanceStore()
      expect(store.totalIncome).toBeCloseTo(1069.8, 5)
      expect(store.totalExpense).toBeCloseTo(2090.5, 5)
      expect(store.balance).toBe(store.totalIncome - store.totalExpense)
    })

    it('expõe activeStudents e defaulters', () => {
      const store = useFinanceStore()
      expect(store.activeStudents).toBe(240)
      expect(store.defaulters).toBe(18)
    })

    it('addTransaction e removeTransaction', () => {
      const store = useFinanceStore()
      const before = store.transactions.length
      store.addTransaction({
        description: 'Teste',
        category: 'Outros',
        amount: 10,
        type: 'income',
        date: '2026-08-20',
      })
      expect(store.transactions).toHaveLength(before + 1)
      const id = store.transactions[0].id
      store.removeTransaction(id)
      expect(store.transactions).toHaveLength(before)
    })
  })

  describe('useUsersStore', () => {
    it('findByCredentials retorna o usuário admin com credenciais corretas', () => {
      const store = useUsersStore()
      const user = store.findByCredentials('admin', 'spartan123')
      expect(user).toBeTruthy()
      expect(user?.role).toBe('admin')
    })

    it('findByCredentials retorna undefined com senha errada', () => {
      const store = useUsersStore()
      expect(store.findByCredentials('admin', 'errada')).toBeUndefined()
    })

    it('addUser e removeUser', () => {
      const store = useUsersStore()
      const before = store.users.length
      store.addUser({
        name: 'Teste',
        email: 'teste@teste.com',
        username: 'teste',
        password: 'senha',
        role: 'editor',
        active: true,
      })
      expect(store.users).toHaveLength(before + 1)
      const id = store.users[store.users.length - 1].id
      store.removeUser(id)
      expect(store.users).toHaveLength(before)
    })
  })

  describe('useErpStore', () => {
    it('carrega 5 módulos', () => {
      const store = useErpStore()
      expect(store.modules).toHaveLength(5)
    })

    it('toggleModule alterna enabled', () => {
      const store = useErpStore()
      const mod = store.modules[0]
      const before = mod.enabled
      store.toggleModule(mod.id, !before)
      expect(store.modules[0].enabled).toBe(!before)
    })

    it('setIntegrationUrl atualiza a url', () => {
      const store = useErpStore()
      const mod = store.modules[0]
      store.setIntegrationUrl(mod.id, 'https://example.com')
      expect(store.modules[0].integrationUrl).toBe('https://example.com')
    })
  })

  describe('useAuthStore', () => {
    it('inicia não autenticado', () => {
      const store = useAuthStore()
      expect(store.isAuthenticated).toBe(false)
    })

    it('login com credenciais corretas autentica como admin', () => {
      const store = useAuthStore()
      expect(store.login('admin', 'spartan123')).toBe(true)
      expect(store.isAuthenticated).toBe(true)
      expect(store.isAdmin).toBe(true)
    })

    it('login com senha errada retorna false', () => {
      const store = useAuthStore()
      expect(store.login('admin', 'errada')).toBe(false)
      expect(store.isAuthenticated).toBe(false)
    })

    it('logout limpa a sessão', () => {
      const store = useAuthStore()
      store.login('admin', 'spartan123')
      store.logout()
      expect(store.isAuthenticated).toBe(false)
      expect(store.user).toBeNull()
      expect(store.token).toBeNull()
    })
  })
})
