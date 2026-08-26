<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useContentStore } from '@/store/content'

const content = useContentStore()

const form = reactive(structuredClone(content.config))
const saved = ref(false)

function addHour() {
  form.hours.push({ day: '', time: '' })
}

function removeHour(index: number) {
  form.hours.splice(index, 1)
}

function save() {
  content.updateConfig({ ...form })
  saved.value = true
  setTimeout(() => (saved.value = false), 3000)
}
</script>

<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white">Configurações do site</h1>
        <p class="mt-1 text-sm text-zinc-400">Texto do hero, contato, horários e redes sociais.</p>
      </div>
      <button type="button" class="btn-primary" @click="save">Salvar alterações</button>
    </div>

    <p
      v-if="saved"
      class="mb-4 rounded border border-green-600 bg-green-600/10 px-4 py-3 text-sm text-green-400"
    >
      Configurações salvas com sucesso!
    </p>

    <form class="space-y-6" @submit.prevent="save">
      <div class="card">
        <h2 class="mb-4 text-lg font-bold text-white">Hero (página inicial)</h2>
        <div class="space-y-4">
          <div>
            <label class="label">Título</label>
            <input v-model="form.heroTitle" type="text" class="input" />
          </div>
          <div>
            <label class="label">Subtítulo</label>
            <textarea v-model="form.heroSubtitle" rows="3" class="input resize-none"></textarea>
          </div>
          <div>
            <label class="label">Texto do CTA</label>
            <input v-model="form.heroCta" type="text" class="input" />
          </div>
        </div>
      </div>

      <div class="card">
        <h2 class="mb-4 text-lg font-bold text-white">Contato</h2>
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="label">Telefone</label>
            <input v-model="form.phone" type="text" class="input" />
          </div>
          <div>
            <label class="label">WhatsApp (link)</label>
            <input v-model="form.whatsapp" type="url" class="input" />
          </div>
          <div>
            <label class="label">E-mail</label>
            <input v-model="form.email" type="email" class="input" />
          </div>
          <div>
            <label class="label">Endereço</label>
            <input v-model="form.address" type="text" class="input" />
          </div>
        </div>
      </div>

      <div class="card">
        <h2 class="mb-4 text-lg font-bold text-white">Redes sociais</h2>
        <div class="grid gap-4 sm:grid-cols-3">
          <div>
            <label class="label">Instagram</label>
            <input v-model="form.instagram" type="url" class="input" />
          </div>
          <div>
            <label class="label">Facebook</label>
            <input v-model="form.facebook" type="url" class="input" />
          </div>
          <div>
            <label class="label">YouTube</label>
            <input v-model="form.youtube" type="url" class="input" />
          </div>
        </div>
      </div>

      <div class="card">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-lg font-bold text-white">Horários</h2>
          <button type="button" class="text-accent hover:underline" @click="addHour">+ Adicionar</button>
        </div>
        <div class="space-y-3">
          <div v-for="(h, i) in form.hours" :key="i" class="flex items-center gap-3">
            <input v-model="h.day" type="text" placeholder="Dia" class="input flex-1" />
            <input v-model="h.time" type="text" placeholder="Horário" class="input flex-1" />
            <button type="button" class="text-red-400 hover:underline" @click="removeHour(i)">Remover</button>
          </div>
        </div>
      </div>

      <div class="card">
        <h2 class="mb-4 text-lg font-bold text-white">Mapa</h2>
        <div>
          <label class="label">URL de embed do Google Maps</label>
          <input v-model="form.mapEmbed" type="url" class="input" />
        </div>
      </div>

      <button type="submit" class="btn-primary">Salvar alterações</button>
    </form>
  </div>
</template>
