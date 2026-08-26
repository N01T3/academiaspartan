<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useContentStore } from '@/store/content'
import BaseModal from '@/components/ui/BaseModal.vue'
import type { TeamMember } from '@/types'

const content = useContentStore()

const modalOpen = ref(false)
const editingId = ref<string | null>(null)

const empty = (): Omit<TeamMember, 'id'> => ({
  name: '',
  role: '',
  bio: '',
  credentials: [],
  image: '',
})

const form = reactive<Omit<TeamMember, 'id'> & { credentialsText: string }>({
  ...empty(),
  credentialsText: '',
})

function openNew() {
  editingId.value = null
  Object.assign(form, { ...empty(), credentialsText: '' })
  modalOpen.value = true
}

function openEdit(member: TeamMember) {
  editingId.value = member.id
  Object.assign(form, { ...member, credentialsText: member.credentials.join(', ') })
  modalOpen.value = true
}

function save() {
  const payload = {
    name: form.name,
    role: form.role,
    bio: form.bio,
    image: form.image,
    credentials: form.credentialsText
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean),
  }
  if (editingId.value) content.updateTeam(editingId.value, payload)
  else content.addTeam(payload)
  modalOpen.value = false
}

function remove(member: TeamMember) {
  if (confirm(`Excluir "${member.name}"?`)) content.removeTeam(member.id)
}
</script>

<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white">Equipe</h1>
        <p class="mt-1 text-sm text-zinc-400">Gerencie os profissionais da academia.</p>
      </div>
      <button type="button" class="btn-primary" @click="openNew">Novo membro</button>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="member in content.team" :key="member.id" class="card">
        <div class="flex items-center gap-4">
          <img :src="member.image" :alt="member.name" class="h-14 w-14 rounded-full object-cover" />
          <div class="min-w-0">
            <h3 class="truncate font-bold text-white">{{ member.name }}</h3>
            <p class="truncate text-sm text-accent">{{ member.role }}</p>
          </div>
        </div>
        <p class="mt-3 line-clamp-3 text-sm text-zinc-400">{{ member.bio }}</p>
        <div class="mt-4 flex justify-end gap-3">
          <button type="button" class="text-accent hover:underline" @click="openEdit(member)">Editar</button>
          <button type="button" class="text-red-400 hover:underline" @click="remove(member)">Excluir</button>
        </div>
      </div>
    </div>

    <BaseModal
      :open="modalOpen"
      :title="editingId ? 'Editar membro' : 'Novo membro'"
      @close="modalOpen = false"
    >
      <form class="space-y-4" @submit.prevent="save">
        <div>
          <label class="label">Nome</label>
          <input v-model="form.name" type="text" required class="input" />
        </div>
        <div>
          <label class="label">Função</label>
          <input v-model="form.role" type="text" required class="input" />
        </div>
        <div>
          <label class="label">Bio</label>
          <textarea v-model="form.bio" rows="3" required class="input resize-none"></textarea>
        </div>
        <div>
          <label class="label">Credenciais (separadas por vírgula)</label>
          <input
            v-model="form.credentialsText"
            type="text"
            class="input"
            placeholder="CREF 123, Cert. IFBB..."
          />
        </div>
        <div>
          <label class="label">Foto (URL)</label>
          <input v-model="form.image" type="url" required class="input" />
        </div>
        <div class="flex justify-end gap-3">
          <button type="button" class="btn-outline" @click="modalOpen = false">Cancelar</button>
          <button type="submit" class="btn-primary">Salvar</button>
        </div>
      </form>
    </BaseModal>
  </div>
</template>
