<script setup lang="ts">
import { computed, ref } from 'vue'
import { useContentStore } from '@/store/content'
import BaseModal from '@/components/ui/BaseModal.vue'
import { formatDate } from '@/utils/format'
import type { ContactMessage } from '@/types'

const content = useContentStore()
const selected = ref<ContactMessage | null>(null)

const unreadCount = computed(() => content.messages.filter((m) => !m.read).length)

function openMessage(msg: ContactMessage) {
  selected.value = msg
  if (!msg.read) content.updateMessage(msg.id, { read: true })
}

function remove(msg: ContactMessage) {
  if (confirm('Excluir esta mensagem?')) {
    content.removeMessage(msg.id)
    if (selected.value?.id === msg.id) selected.value = null
  }
}
</script>

<template>
  <div>
    <div class="mb-4">
      <h1 class="text-h5">Mensagens</h1>
      <p class="text-body-2 text-medium-emphasis mt-1">
        Mensagens recebidas pelo formulário de contato. {{ unreadCount }} não lida(s).
      </p>
    </div>

    <v-card v-if="content.messages.length">
      <v-list lines="two">
        <v-list-item v-for="msg in content.messages" :key="msg.id" @click="openMessage(msg)">
          <template #prepend>
            <v-icon
              :icon="msg.read ? 'mdi-circle-small' : 'mdi-circle'"
              :color="msg.read ? 'surface-bright' : 'primary'"
            />
          </template>
          <v-list-item-title>
            {{ msg.name }} <span class="text-medium-emphasis">— {{ msg.subject }}</span>
          </v-list-item-title>
          <v-list-item-subtitle class="text-truncate">{{ msg.message }}</v-list-item-subtitle>
          <template #append>
            <span class="text-caption text-medium-emphasis">{{ formatDate(msg.createdAt) }}</span>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
    <p v-else class="text-medium-emphasis">Nenhuma mensagem recebida.</p>

    <BaseModal :open="!!selected" title="Mensagem" @close="selected = null">
      <div v-if="selected">
        <v-list dense class="bg-transparent">
          <v-list-item title="Nome" :subtitle="selected.name" />
          <v-list-item title="E-mail" :subtitle="selected.email" />
          <v-list-item title="Telefone" :subtitle="selected.phone || '—'" />
          <v-list-item title="Assunto" :subtitle="selected.subject" />
          <v-list-item title="Data" :subtitle="formatDate(selected.createdAt)" />
        </v-list>
        <v-card variant="tonal" color="surface-variant" class="pa-4 mt-2">
          <p class="text-body-2 text-high-emphasis">{{ selected.message }}</p>
        </v-card>
        <div class="d-flex justify-end ga-2 mt-4">
          <v-btn variant="text" color="error" @click="remove(selected)">Excluir</v-btn>
          <v-btn color="primary" @click="selected = null">Fechar</v-btn>
        </div>
      </div>
    </BaseModal>
  </div>
</template>
