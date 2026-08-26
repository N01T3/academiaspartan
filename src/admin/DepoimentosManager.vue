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
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white">Depoimentos</h1>
        <p class="mt-1 text-sm text-zinc-400">Gerencie os depoimentos exibidos no site.</p>
      </div>
      <button type="button" class="btn-primary" @click="openNew">Novo depoimento</button>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="t in content.testimonials" :key="t.id" class="card">
        <p class="text-sm text-zinc-300">"{{ t.quote }}"</p>
        <div class="mt-4 flex items-center justify-between border-t border-ink-600 pt-4">
          <div class="flex items-center gap-3">
            <img :src="t.image" :alt="t.name" class="h-10 w-10 rounded-full object-cover" />
            <div>
              <p class="text-sm font-bold text-white">{{ t.name }}</p>
              <p class="text-xs text-accent">{{ t.role }}</p>
            </div>
          </div>
          <div class="flex gap-3 text-sm">
            <button type="button" class="text-accent hover:underline" @click="openEdit(t)">Editar</button>
            <button type="button" class="text-red-400 hover:underline" @click="remove(t)">Excluir</button>
          </div>
        </div>
      </div>
    </div>

    <BaseModal
      :open="modalOpen"
      :title="editingId ? 'Editar depoimento' : 'Novo depoimento'"
      @close="modalOpen = false"
    >
      <form class="space-y-4" @submit.prevent="save">
        <div>
          <label class="label">Nome</label>
          <input v-model="form.name" type="text" required class="input" />
        </div>
        <div>
          <label class="label">Função / modalidade</label>
          <input v-model="form.role" type="text" required class="input" />
        </div>
        <div>
          <label class="label">Depoimento</label>
          <textarea v-model="form.quote" rows="4" required class="input resize-none"></textarea>
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
