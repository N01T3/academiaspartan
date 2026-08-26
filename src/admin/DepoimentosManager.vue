<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useContentStore } from '@/store/content'
import BaseModal from '@/components/ui/BaseModal.vue'
import type { Testimonial } from '@/types'

const content = useContentStore()

const modalOpen = ref(false)
const editingId = ref<string | null>(null)

const form = reactive<Omit<Testimonial, 'id'>>({
  name: '',
  role: '',
  quote: '',
  image: '',
})

function openNew() {
  editingId.value = null
  Object.assign(form, { name: '', role: '', quote: '', image: '' })
  modalOpen.value = true
}

function openEdit(t: Testimonial) {
  editingId.value = t.id
  Object.assign(form, t)
  modalOpen.value = true
}

function save() {
  if (editingId.value) content.updateTestimonial(editingId.value, { ...form })
  else content.addTestimonial({ ...form })
  modalOpen.value = false
}

function remove(t: Testimonial) {
  if (confirm(`Excluir depoimento de "${t.name}"?`)) content.removeTestimonial(t.id)
}
</script>

<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-4">
      <div>
        <h1 class="text-h5">Depoimentos</h1>
        <p class="text-body-2 text-medium-emphasis mt-1">Gerencie os depoimentos exibidos no site.</p>
      </div>
      <v-btn color="primary" prepend-icon="mdi-plus" @click="openNew">Novo depoimento</v-btn>
    </div>

    <v-row>
      <v-col v-for="t in content.testimonials" :key="t.id" cols="12" sm="6" lg="4">
        <v-card height="100%">
          <v-card-text>
            <p class="text-body-2 text-high-emphasis">"{{ t.quote }}"</p>
            <v-divider class="my-3" />
            <div class="d-flex align-center justify-space-between">
              <div class="d-flex align-center ga-3">
                <v-avatar size="40">
                  <v-img :src="t.image" :alt="t.name" cover />
                </v-avatar>
                <div>
                  <p class="text-body-2 font-weight-bold">{{ t.name }}</p>
                  <p class="text-caption text-secondary">{{ t.role }}</p>
                </div>
              </div>
              <div class="d-flex ga-1">
                <v-btn size="small" variant="text" color="secondary" @click="openEdit(t)">Editar</v-btn>
                <v-btn size="small" variant="text" color="error" @click="remove(t)">Excluir</v-btn>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <BaseModal
      :open="modalOpen"
      :title="editingId ? 'Editar depoimento' : 'Novo depoimento'"
      @close="modalOpen = false"
    >
      <v-form @submit.prevent="save">
        <v-text-field v-model="form.name" label="Nome" />
        <v-text-field v-model="form.role" label="Função / modalidade" />
        <v-textarea v-model="form.quote" label="Depoimento" rows="4" auto-grow />
        <v-text-field v-model="form.image" label="Foto (URL)" />
        <div class="d-flex justify-end ga-2">
          <v-btn variant="outlined" @click="modalOpen = false">Cancelar</v-btn>
          <v-btn type="submit" color="primary">Salvar</v-btn>
        </div>
      </v-form>
    </BaseModal>
  </div>
</template>
