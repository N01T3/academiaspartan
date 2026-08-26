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
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white">Posts do Blog</h1>
        <p class="mt-1 text-sm text-zinc-400">Gerencie os artigos publicados no site.</p>
      </div>
      <button type="button" class="btn-primary" @click="openNew">Novo post</button>
    </div>

    <div class="card overflow-x-auto p-0">
      <table class="w-full text-left text-sm">
        <thead class="border-b border-ink-500 text-xs uppercase tracking-wider text-zinc-400">
          <tr>
            <th class="px-4 py-3">Título</th>
            <th class="px-4 py-3">Categoria</th>
            <th class="px-4 py-3">Autor</th>
            <th class="px-4 py-3">Publicado</th>
            <th class="px-4 py-3 text-right">Ações</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-ink-600">
          <tr v-for="post in content.posts" :key="post.id" class="hover:bg-ink-700/50">
            <td class="px-4 py-3 font-medium text-white">{{ post.title }}</td>
            <td class="px-4 py-3 text-zinc-300">{{ post.category }}</td>
            <td class="px-4 py-3 text-zinc-300">{{ post.author }}</td>
            <td class="px-4 py-3">
              <span :class="post.published ? 'text-green-400' : 'text-zinc-500'">
                {{ post.published ? 'Sim' : 'Não' }}
              </span>
            </td>
            <td class="px-4 py-3 text-right">
              <button type="button" class="mr-2 text-accent hover:underline" @click="openEdit(post)">
                Editar
              </button>
              <button type="button" class="text-red-400 hover:underline" @click="remove(post)">
                Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <BaseModal :open="modalOpen" :title="editingId ? 'Editar post' : 'Novo post'" @close="modalOpen = false">
      <form class="space-y-4" @submit.prevent="save">
        <div>
          <label class="label">Título</label>
          <input v-model="form.title" type="text" required class="input" @blur="onTitleBlur" />
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="label">Slug</label>
            <input v-model="form.slug" type="text" required class="input" />
          </div>
          <div>
            <label class="label">Categoria</label>
            <input v-model="form.category" type="text" required class="input" />
          </div>
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="label">Autor</label>
            <input v-model="form.author" type="text" required class="input" />
          </div>
          <div>
            <label class="label">Data</label>
            <input v-model="form.publishedAt" type="date" required class="input" />
          </div>
        </div>
        <div>
          <label class="label">Imagem (URL)</label>
          <input v-model="form.image" type="url" class="input" placeholder="https://..." />
        </div>
        <div>
          <label class="label">Resumo</label>
          <textarea v-model="form.excerpt" rows="2" required class="input resize-none"></textarea>
        </div>
        <div>
          <label class="label">Conteúdo</label>
          <textarea
            v-model="form.content"
            rows="6"
            required
            class="input resize-none"
            placeholder="Separe os parágrafos com uma linha em branco"
          ></textarea>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <ToggleSwitch v-model="form.published" />
            <span class="text-sm text-zinc-300">Publicado</span>
          </div>
          <div class="flex gap-3">
            <button type="button" class="btn-outline" @click="modalOpen = false">Cancelar</button>
            <button type="submit" class="btn-primary">Salvar</button>
          </div>
        </div>
      </form>
    </BaseModal>
  </div>
</template>
