import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { users as seedUsers } from '@/data/users'
import { loadStorage, saveStorage } from '@/utils/storage'
import { uid } from '@/utils/format'
import type { AdminUser } from '@/types'

const KEY = 'spartan.users'

function seed(): AdminUser[] {
  const list = structuredClone(seedUsers)
  const envUser = import.meta.env.VITE_ADMIN_USER as string | undefined
  const envPass = import.meta.env.VITE_ADMIN_PASS as string | undefined
  if (envUser || envPass) {
    const admin = list.find((u) => u.role === 'admin')
    if (admin) {
      if (envUser) admin.username = envUser
      if (envPass) admin.password = envPass
    }
  }
  return list
}

export const useUsersStore = defineStore('users', () => {
  const users = ref<AdminUser[]>(loadStorage(KEY, seed()))

  function persist() {
    saveStorage(KEY, users.value)
  }

  const activeUsers = computed(() => users.value.filter((u) => u.active))

  function addUser(data: Omit<AdminUser, 'id'>) {
    users.value.push({ ...data, id: uid() })
    persist()
  }

  function updateUser(id: string, data: Partial<AdminUser>) {
    const idx = users.value.findIndex((u) => u.id === id)
    if (idx !== -1) {
      users.value[idx] = { ...users.value[idx], ...data }
      persist()
    }
  }

  function removeUser(id: string) {
    users.value = users.value.filter((u) => u.id !== id)
    persist()
  }

  function findByCredentials(username: string, password: string) {
    return users.value.find(
      (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password,
    )
  }

  return { users, activeUsers, addUser, updateUser, removeUser, findByCredentials }
})
