import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUsersStore } from '@/store/users'
import { loadStorage, saveStorage } from '@/utils/storage'
import { isAdminUser } from '@/utils/validators'
import type { AdminUser } from '@/types'

const TOKEN_KEY = 'spartan.token'
const USER_KEY = 'spartan.session'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(
    loadStorage<string | null>(
      TOKEN_KEY,
      null,
      (v): v is string | null => v === null || typeof v === 'string',
    ),
  )
  const user = ref<AdminUser | null>(
    loadStorage<AdminUser | null>(USER_KEY, null, (v): v is AdminUser | null => v === null || isAdminUser(v)),
  )

  const isAuthenticated = computed(() => token.value !== null && user.value !== null)
  const isAdmin = computed(() => user.value?.role === 'admin')

  function login(username: string, password: string): boolean {
    const usersStore = useUsersStore()
    const found = usersStore.findByCredentials(username, password)
    if (!found || !found.active) return false
    token.value = `mock-${Date.now().toString(36)}`
    user.value = found
    saveStorage(TOKEN_KEY, token.value)
    saveStorage(USER_KEY, user.value)
    return true
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }

  return { token, user, isAuthenticated, isAdmin, login, logout }
})
