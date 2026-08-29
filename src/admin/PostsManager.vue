<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useContentStore } from '@/store/content'
import BaseModal from '@/components/ui/BaseModal.vue'
import ToggleSwitch from '@/components/ui/ToggleSwitch.vue'
import { slugify } from '@/utils/format'
import type { BlogPost } from '@/types'

const content = useContentStore()

const modalOpen = ref(false)
const editingId = ref<string | null>(null)

const empty = (): Omit<BlogPost, 'id'> => ({
  slug: '',
  title: '',
  excerpt: '',
  content: '',
  category: '',
  image: '',
  author: '',
  publishedAt: new Date().toISOString().slice(0, 10),
  published: true,
})

const form = reactive<Omit<BlogPost, 'id'>>(empty())

const headers = [
  { title: 'Título', key: 'title' },
  { title: 'Categoria', key: 'category' },
  { title: 'Autor', key: 'author' },
  { title: 'Publicado', key: 'published' },
  { title: 'Ações', key: 'actions', sortable: false, align: 'end' },
] as const

function openNew() {
  editingId.value = null
  Object.assign(form, empty())
  modalOpen.value = true
}

function openEdit(post: BlogPost) {
  editingId.value = post.id
  Object.assign(form, post)
  modalOpen.value = true
}

function save() {
  if (!form.slug) form.slug = slugify(form.title)
  if (editingId.value) {
    content.updatePost(editingId.value, { ...form })
  } else {
    content.addPost({ ...form })
  }
  modalOpen.value = false
}

function remove(post: BlogPost) {
  if (confirm(`Excluir o post "${post.title}"?`)) content.removePost(post.id)
}

function onTitleBlur() {
  if (!form.slug) form.slug = slugify(form.title)
}
</script>

<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-4">
      <div>
        <h1 class="text-h5">Posts do Blog</h1>
        <p class="text-body-2 text-medium-emphasis mt-1">Gerencie os artigos publicados no site.</p>
      </div>
      <v-btn color="primary" prepend-icon="mdi-plus" @click="openNew">Novo post</v-btn>
    </div>

    <v-card>
      <v-data-table :headers="headers" :items="content.posts" :items-per-page="-1" hover>
        <template #item.published="{ item }">
          <v-chip :color="item.published ? 'success' : 'surface-bright'" size="small" variant="tonal">
            {{ item.published ? 'Sim' : 'Não' }}
          </v-chip>
        </template>
        <template #item.actions="{ item }">
          <div class="d-flex justify-end ga-1">
            <v-btn size="small" variant="text" color="secondary" @click="openEdit(item)">Editar</v-btn>
            <v-btn size="small" variant="text" color="error" @click="remove(item)">Excluir</v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <BaseModal :open="modalOpen" :title="editingId ? 'Editar post' : 'Novo post'" @close="modalOpen = false">
      <v-form @submit.prevent="save">
        <v-text-field v-model="form.title" label="Título" @blur="onTitleBlur" />
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field v-model="form.slug" label="Slug" />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="form.category" label="Categoria" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field v-model="form.author" label="Autor" />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="form.publishedAt" label="Data" type="date" />
          </v-col>
        </v-row>
        <v-text-field v-model="form.image" label="Imagem (URL)" placeholder="https://..." />
        <v-textarea v-model="form.excerpt" label="Resumo" rows="2" auto-grow />
        <v-textarea
          v-model="form.content"
          label="Conteúdo"
          rows="5"
          placeholder="Separe os parágrafos com uma linha em branco"
          auto-grow
        />
        <div class="d-flex align-center justify-space-between">
          <div class="d-flex align-center ga-3">
            <ToggleSwitch v-model="form.published" />
            <span class="text-body-2">Publicado</span>
          </div>
          <div class="d-flex ga-2">
            <v-btn variant="outlined" @click="modalOpen = false">Cancelar</v-btn>
            <v-btn type="submit" color="primary">Salvar</v-btn>
          </div>
        </div>
      </v-form>
    </BaseModal>
  </div>
</template>
