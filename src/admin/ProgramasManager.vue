<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useContentStore } from '@/store/content'
import BaseModal from '@/components/ui/BaseModal.vue'
import type { Program } from '@/types'

const content = useContentStore()

const modalOpen = ref(false)
const editingId = ref<string | null>(null)

const form = reactive<Omit<Program, 'id' | 'features'> & { featuresText: string }>({
  title: '',
  tag: '',
  description: '',
  image: '',
  featuresText: '',
})

function openNew() {
  editingId.value = null
  Object.assign(form, { title: '', tag: '', description: '', image: '', featuresText: '' })
  modalOpen.value = true
}

function openEdit(p: Program) {
  editingId.value = p.id
  Object.assign(form, { ...p, featuresText: p.features.join(', ') })
  modalOpen.value = true
}

function save() {
  const payload = {
    title: form.title,
    tag: form.tag,
    description: form.description,
    image: form.image,
    features: form.featuresText
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean),
  }
  if (editingId.value) content.updateProgram(editingId.value, payload)
  else content.addProgram(payload)
  modalOpen.value = false
}

function remove(p: Program) {
  if (confirm(`Excluir o programa "${p.title}"?`)) content.removeProgram(p.id)
}
</script>

<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-4">
      <div>
        <h1 class="text-h5">Programas & Modalidades</h1>
        <p class="text-body-2 text-medium-emphasis mt-1">Gerencie os programas oferecidos.</p>
      </div>
      <v-btn color="primary" prepend-icon="mdi-plus" @click="openNew">Novo programa</v-btn>
    </div>

    <v-row>
      <v-col v-for="p in content.programs" :key="p.id" cols="12" sm="6">
        <v-card height="100%">
          <v-img :src="p.image" :alt="p.title" height="140" cover class="mx-3 mt-3 rounded" />
          <v-card-text>
            <div class="d-flex align-center justify-space-between">
              <h3 class="text-subtitle-1 font-weight-bold">{{ p.title }}</h3>
              <v-chip color="primary" size="small" class="text-uppercase">{{ p.tag }}</v-chip>
            </div>
            <p class="text-body-2 text-medium-emphasis mt-2 program-desc">{{ p.description }}</p>
            <v-divider class="my-3" />
            <div class="d-flex justify-end ga-1">
              <v-btn size="small" variant="text" color="secondary" @click="openEdit(p)">Editar</v-btn>
              <v-btn size="small" variant="text" color="error" @click="remove(p)">Excluir</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <BaseModal
      :open="modalOpen"
      :title="editingId ? 'Editar programa' : 'Novo programa'"
      @close="modalOpen = false"
    >
      <v-form @submit.prevent="save">
        <v-text-field v-model="form.title" label="Título" />
        <v-text-field v-model="form.tag" label="Tag" placeholder="Diferencial, Performance..." />
        <v-textarea v-model="form.description" label="Descrição" rows="3" auto-grow />
        <v-text-field v-model="form.featuresText" label="Recursos (separados por vírgula)" />
        <v-text-field v-model="form.image" label="Imagem (URL)" />
        <div class="d-flex justify-end ga-2">
          <v-btn variant="outlined" @click="modalOpen = false">Cancelar</v-btn>
          <v-btn type="submit" color="primary">Salvar</v-btn>
        </div>
      </v-form>
    </BaseModal>
  </div>
</template>

<style scoped>
.program-desc {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
