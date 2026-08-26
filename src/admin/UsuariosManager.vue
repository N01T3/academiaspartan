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

const headers = [
  { title: 'Nome', key: 'name' },
  { title: 'Usuário', key: 'username' },
  { title: 'Papel', key: 'role' },
  { title: 'Ativo', key: 'active' },
  { title: 'Ações', key: 'actions', sortable: false, align: 'end' },
] as const

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
    <div class="d-flex align-center justify-space-between mb-4">
      <div>
        <h1 class="text-h5">Usuários</h1>
        <p class="text-body-2 text-medium-emphasis mt-1">Gerencie os acessos ao painel administrativo.</p>
      </div>
      <v-btn color="primary" prepend-icon="mdi-plus" @click="openNew">Novo usuário</v-btn>
    </div>

    <v-card>
      <v-data-table :headers="headers" :items="usersStore.users" :items-per-page="-1" hover>
        <template #item.role="{ item }">
          <v-chip
            :color="item.role === 'admin' ? 'primary' : 'surface-bright'"
            size="small"
            class="text-uppercase"
          >
            {{ item.role }}
          </v-chip>
        </template>
        <template #item.active="{ item }">
          <span :class="item.active ? 'text-success' : 'text-medium-emphasis'">
            {{ item.active ? 'Sim' : 'Não' }}
          </span>
        </template>
        <template #item.actions="{ item }">
          <div class="d-flex justify-end ga-1">
            <v-btn size="small" variant="text" color="secondary" @click="openEdit(item)">Editar</v-btn>
            <v-btn size="small" variant="text" color="error" @click="remove(item)">Excluir</v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <BaseModal
      :open="modalOpen"
      :title="editingId ? 'Editar usuário' : 'Novo usuário'"
      @close="modalOpen = false"
    >
      <v-form @submit.prevent="save">
        <v-text-field v-model="form.name" label="Nome" />
        <v-text-field v-model="form.email" label="E-mail" type="email" />
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field v-model="form.username" label="Usuário" />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="form.password" label="Senha" />
          </v-col>
        </v-row>
        <v-select
          v-model="form.role"
          label="Papel"
          :items="[
            { title: 'Administrador', value: 'admin' },
            { title: 'Editor', value: 'editor' },
          ]"
        />
        <div class="d-flex align-center ga-3">
          <ToggleSwitch v-model="form.active" />
          <span class="text-body-2">Ativo</span>
        </div>
        <div class="d-flex justify-end ga-2 mt-2">
          <v-btn variant="outlined" @click="modalOpen = false">Cancelar</v-btn>
          <v-btn type="submit" color="primary">Salvar</v-btn>
        </div>
      </v-form>
    </BaseModal>
  </div>
</template>
