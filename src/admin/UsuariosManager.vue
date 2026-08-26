<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useUsersStore } from '@/store/users'
import { useAuth } from '@/composables/useAuth'
import BaseModal from '@/components/ui/BaseModal.vue'
import ToggleSwitch from '@/components/ui/ToggleSwitch.vue'
import type { AdminUser } from '@/types'

const usersStore = useUsersStore()
const auth = useAuth()

const modalOpen = ref(false)
const editingId = ref<string | null>(null)

const form = reactive<Omit<AdminUser, 'id'>>({
  name: '',
  email: '',
  username: '',
  password: '',
  role: 'editor',
  active: true,
})

function openNew() {
  editingId.value = null
  Object.assign(form, { name: '', email: '', username: '', password: '', role: 'editor', active: true })
  modalOpen.value = true
}

function openEdit(u: AdminUser) {
  editingId.value = u.id
  Object.assign(form, u)
  modalOpen.value = true
}

function save() {
  if (editingId.value) usersStore.updateUser(editingId.value, { ...form })
  else usersStore.addUser({ ...form })
  modalOpen.value = false
}

function remove(u: AdminUser) {
  if (u.id === auth.user?.id) {
    alert('Você não pode excluir o usuário logado.')
    return
  }
  if (confirm(`Excluir o usuário "${u.name}"?`)) usersStore.removeUser(u.id)
}
</script>

<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white">Usuários</h1>
        <p class="mt-1 text-sm text-zinc-400">Gerencie os acessos ao painel administrativo.</p>
      </div>
      <button type="button" class="btn-primary" @click="openNew">Novo usuário</button>
    </div>

    <div class="card overflow-x-auto p-0">
      <table class="w-full text-left text-sm">
        <thead class="border-b border-ink-500 text-xs uppercase tracking-wider text-zinc-400">
          <tr>
            <th class="px-4 py-3">Nome</th>
            <th class="px-4 py-3">Usuário</th>
            <th class="px-4 py-3">Papel</th>
            <th class="px-4 py-3">Ativo</th>
            <th class="px-4 py-3 text-right">Ações</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-ink-600">
          <tr v-for="u in usersStore.users" :key="u.id" class="hover:bg-ink-700/50">
            <td class="px-4 py-3 font-medium text-white">{{ u.name }}</td>
            <td class="px-4 py-3 text-zinc-300">{{ u.username }}</td>
            <td class="px-4 py-3">
              <span
                class="rounded px-2 py-1 text-xs font-bold uppercase"
                :class="u.role === 'admin' ? 'bg-primary/20 text-primary' : 'bg-ink-700 text-zinc-300'"
              >
                {{ u.role }}
              </span>
            </td>
            <td class="px-4 py-3">
              <span :class="u.active ? 'text-green-400' : 'text-zinc-500'">{{
                u.active ? 'Sim' : 'Não'
              }}</span>
            </td>
            <td class="px-4 py-3 text-right">
              <button type="button" class="mr-2 text-accent hover:underline" @click="openEdit(u)">
                Editar
              </button>
              <button type="button" class="text-red-400 hover:underline" @click="remove(u)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <BaseModal
      :open="modalOpen"
      :title="editingId ? 'Editar usuário' : 'Novo usuário'"
      @close="modalOpen = false"
    >
      <form class="space-y-4" @submit.prevent="save">
        <div>
          <label class="label">Nome</label>
          <input v-model="form.name" type="text" required class="input" />
        </div>
        <div>
          <label class="label">E-mail</label>
          <input v-model="form.email" type="email" required class="input" />
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="label">Usuário</label>
            <input v-model="form.username" type="text" required class="input" />
          </div>
          <div>
            <label class="label">Senha</label>
            <input v-model="form.password" type="text" required class="input" />
          </div>
        </div>
        <div>
          <label class="label">Papel</label>
          <select v-model="form.role" class="input">
            <option value="admin">Administrador</option>
            <option value="editor">Editor</option>
          </select>
        </div>
        <div class="flex items-center gap-3">
          <ToggleSwitch v-model="form.active" />
          <span class="text-sm text-zinc-300">Ativo</span>
        </div>
        <div class="flex justify-end gap-3">
          <button type="button" class="btn-outline" @click="modalOpen = false">Cancelar</button>
          <button type="submit" class="btn-primary">Salvar</button>
        </div>
      </form>
    </BaseModal>
  </div>
</template>
