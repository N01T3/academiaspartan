<script setup lang="ts">
defineProps<{
  open: boolean
  title: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="emit('close')"
      >
        <div class="absolute inset-0 bg-black/70" @click="emit('close')"></div>
        <div
          class="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-lg border border-ink-500 bg-ink-800 p-6 shadow-2xl"
        >
          <div class="mb-5 flex items-center justify-between">
            <h3 class="text-xl font-bold text-white">{{ title }}</h3>
            <button
              type="button"
              class="text-zinc-400 transition-colors hover:text-white"
              aria-label="Fechar"
              @click="emit('close')"
            >
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
