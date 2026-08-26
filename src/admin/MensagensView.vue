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
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-white">Mensagens</h1>
      <p class="mt-1 text-sm text-zinc-400">
        Mensagens recebidas pelo formulário de contato. {{ unreadCount }} não lida(s).
      </p>
    </div>

    <div v-if="content.messages.length" class="card divide-y divide-ink-600 p-0">
      <button
        v-for="msg in content.messages"
        :key="msg.id"
        type="button"
        class="flex w-full items-center gap-4 px-4 py-3 text-left transition-colors hover:bg-ink-700/50"
        @click="openMessage(msg)"
      >
        <span class="h-2 w-2 shrink-0 rounded-full" :class="msg.read ? 'bg-ink-500' : 'bg-primary'"></span>
        <div class="min-w-0 flex-1">
          <p class="truncate font-medium text-white">
            {{ msg.name }} <span class="text-zinc-500">— {{ msg.subject }}</span>
          </p>
          <p class="truncate text-sm text-zinc-400">{{ msg.message }}</p>
        </div>
        <span class="shrink-0 text-xs text-zinc-500">{{ formatDate(msg.createdAt) }}</span>
      </button>
    </div>
    <p v-else class="text-zinc-400">Nenhuma mensagem recebida.</p>

    <BaseModal :open="!!selected" title="Mensagem" @close="selected = null">
      <div v-if="selected" class="space-y-4">
        <div class="grid gap-2 text-sm">
          <p>
            <span class="font-semibold text-white">Nome:</span>
            <span class="text-zinc-300">{{ selected.name }}</span>
          </p>
          <p>
            <span class="font-semibold text-white">E-mail:</span>
            <span class="text-zinc-300">{{ selected.email }}</span>
          </p>
          <p>
            <span class="font-semibold text-white">Telefone:</span>
            <span class="text-zinc-300">{{ selected.phone || '—' }}</span>
          </p>
          <p>
            <span class="font-semibold text-white">Assunto:</span>
            <span class="text-zinc-300">{{ selected.subject }}</span>
          </p>
          <p>
            <span class="font-semibold text-white">Data:</span>
            <span class="text-zinc-300">{{ formatDate(selected.createdAt) }}</span>
          </p>
        </div>
        <div class="rounded bg-ink-700 p-4 text-sm text-zinc-200">{{ selected.message }}</div>
        <div class="flex justify-end gap-3">
          <button type="button" class="text-red-400 hover:underline" @click="remove(selected)">
            Excluir
          </button>
          <button type="button" class="btn-primary" @click="selected = null">Fechar</button>
        </div>
      </div>
    </BaseModal>
  </div>
</template>
