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
  <v-dialog :model-value="open" max-width="560" @update:model-value="(v) => !v && emit('close')">
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between">
        <span class="text-h6">{{ title }}</span>
        <v-btn
          icon="mdi-close"
          variant="text"
          color="medium-emphasis"
          aria-label="Fechar"
          @click="emit('close')"
        />
      </v-card-title>
      <v-divider />
      <v-card-text class="pt-4">
        <slot />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
