<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useContentStore } from '@/store/content'
import type { SiteConfig } from '@/types'

const content = useContentStore()

const form = reactive<SiteConfig>({
  ...content.config,
  hours: content.config.hours.map((h) => ({ ...h })),
})
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
    <div class="d-flex align-center justify-space-between mb-4">
      <div>
        <h1 class="text-h5">Configurações do site</h1>
        <p class="text-body-2 text-medium-emphasis mt-1">Texto do hero, contato, horários e redes sociais.</p>
      </div>
      <v-btn color="primary" @click="save">Salvar alterações</v-btn>
    </div>

    <v-alert v-if="saved" type="success" class="mb-4" text="Configurações salvas com sucesso!" />

    <v-form @submit.prevent="save">
      <v-card class="mb-6 pa-4">
        <h2 class="text-subtitle-1 font-weight-bold mb-3">Hero (página inicial)</h2>
        <v-text-field v-model="form.heroTitle" label="Título" />
        <v-textarea v-model="form.heroSubtitle" label="Subtítulo" rows="3" auto-grow />
        <v-text-field v-model="form.heroCta" label="Texto do CTA" />
      </v-card>

      <v-card class="mb-6 pa-4">
        <h2 class="text-subtitle-1 font-weight-bold mb-3">Contato</h2>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field v-model="form.phone" label="Telefone" />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="form.whatsapp" label="WhatsApp (link)" />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="form.email" label="E-mail" type="email" />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="form.address" label="Endereço" />
          </v-col>
        </v-row>
      </v-card>

      <v-card class="mb-6 pa-4">
        <h2 class="text-subtitle-1 font-weight-bold mb-3">Redes sociais</h2>
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field v-model="form.instagram" label="Instagram" />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field v-model="form.facebook" label="Facebook" />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field v-model="form.youtube" label="YouTube" />
          </v-col>
        </v-row>
      </v-card>

      <v-card class="mb-6 pa-4">
        <div class="d-flex align-center justify-space-between mb-2">
          <h2 class="text-subtitle-1 font-weight-bold">Horários</h2>
          <v-btn size="small" variant="text" color="secondary" prepend-icon="mdi-plus" @click="addHour">
            Adicionar
          </v-btn>
        </div>
        <div v-for="(h, i) in form.hours" :key="i" class="d-flex align-center ga-3">
          <v-text-field v-model="h.day" label="Dia" placeholder="Dia" />
          <v-text-field v-model="h.time" label="Horário" placeholder="Horário" />
          <v-btn icon="mdi-delete-outline" variant="text" color="error" @click="removeHour(i)" />
        </div>
      </v-card>

      <v-card class="mb-6 pa-4">
        <h2 class="text-subtitle-1 font-weight-bold mb-3">Mapa</h2>
        <v-text-field v-model="form.mapEmbed" label="URL de embed do Google Maps" />
      </v-card>

      <v-btn type="submit" color="primary">Salvar alterações</v-btn>
    </v-form>
  </div>
</template>
