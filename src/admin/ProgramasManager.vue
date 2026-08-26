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
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white">Programas & Modalidades</h1>
        <p class="mt-1 text-sm text-zinc-400">Gerencie os programas oferecidos.</p>
      </div>
      <button type="button" class="btn-primary" @click="openNew">Novo programa</button>
    </div>

    <div class="grid gap-6 sm:grid-cols-2">
      <div v-for="p in content.programs" :key="p.id" class="card flex flex-col">
        <img :src="p.image" :alt="p.title" class="mb-4 h-40 w-full rounded object-cover" />
        <div class="mb-2 flex items-center justify-between">
          <h3 class="font-bold text-white">{{ p.title }}</h3>
          <span class="rounded bg-primary px-2 py-1 text-xs font-bold uppercase text-white">{{ p.tag }}</span>
        </div>
        <p class="line-clamp-2 text-sm text-zinc-400">{{ p.description }}</p>
        <div class="mt-4 flex justify-end gap-3 border-t border-ink-600 pt-3">
          <button type="button" class="text-accent hover:underline" @click="openEdit(p)">Editar</button>
          <button type="button" class="text-red-400 hover:underline" @click="remove(p)">Excluir</button>
        </div>
      </div>
    </div>

    <BaseModal
      :open="modalOpen"
      :title="editingId ? 'Editar programa' : 'Novo programa'"
      @close="modalOpen = false"
    >
      <form class="space-y-4" @submit.prevent="save">
        <div>
          <label class="label">Título</label>
          <input v-model="form.title" type="text" required class="input" />
        </div>
        <div>
          <label class="label">Tag</label>
          <input
            v-model="form.tag"
            type="text"
            required
            class="input"
            placeholder="Diferencial, Performance..."
          />
        </div>
        <div>
          <label class="label">Descrição</label>
          <textarea v-model="form.description" rows="3" required class="input resize-none"></textarea>
        </div>
        <div>
          <label class="label">Recursos (separados por vírgula)</label>
          <input v-model="form.featuresText" type="text" class="input" />
        </div>
        <div>
          <label class="label">Imagem (URL)</label>
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
