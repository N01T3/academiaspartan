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
    <div class="d-flex align-center justify-space-between mb-4">
      <div>
        <h1 class="text-h5">Equipe</h1>
        <p class="text-body-2 text-medium-emphasis mt-1">Gerencie os profissionais da academia.</p>
      </div>
      <v-btn color="primary" prepend-icon="mdi-plus" @click="openNew">Novo membro</v-btn>
    </div>

    <v-row>
      <v-col v-for="member in content.team" :key="member.id" cols="12" sm="6" lg="4">
        <v-card>
          <v-card-text>
            <div class="d-flex align-center ga-3">
              <v-avatar size="52">
                <v-img :src="member.image" :alt="member.name" cover />
              </v-avatar>
              <div class="min-w-0">
                <h3 class="text-subtitle-1 font-weight-bold text-truncate">{{ member.name }}</h3>
                <p class="text-caption text-secondary text-truncate">{{ member.role }}</p>
              </div>
            </div>
            <p class="text-body-2 text-medium-emphasis mt-3 member-bio">{{ member.bio }}</p>
            <v-divider class="my-3" />
            <div class="d-flex justify-end ga-1">
              <v-btn size="small" variant="text" color="secondary" @click="openEdit(member)">Editar</v-btn>
              <v-btn size="small" variant="text" color="error" @click="remove(member)">Excluir</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <BaseModal
      :open="modalOpen"
      :title="editingId ? 'Editar membro' : 'Novo membro'"
      @close="modalOpen = false"
    >
      <v-form @submit.prevent="save">
        <v-text-field v-model="form.name" label="Nome" />
        <v-text-field v-model="form.role" label="Função" />
        <v-textarea v-model="form.bio" label="Bio" rows="3" auto-grow />
        <v-text-field
          v-model="form.credentialsText"
          label="Credenciais (separadas por vírgula)"
          placeholder="CREF 123, Cert. IFBB..."
        />
        <v-text-field v-model="form.image" label="Foto (URL)" />
        <div class="d-flex justify-end ga-2">
          <v-btn variant="outlined" @click="modalOpen = false">Cancelar</v-btn>
          <v-btn type="submit" color="primary">Salvar</v-btn>
        </div>
      </v-form>
    </BaseModal>
  </div>
</template>

<style scoped>
.member-bio {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
