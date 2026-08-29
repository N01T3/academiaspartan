<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}>()
</script>

<template>
  <div :class="align === 'center' ? 'text-center' : 'text-left'">
    <p v-if="eyebrow" class="eyebrow mb-3">{{ eyebrow }}</p>
    <h2 class="display-2">{{ title }}</h2>
    <p
      v-if="subtitle"
      class="mt-4 text-body-1 text-medium-emphasis"
      :class="align === 'center' ? 'mx-auto' : ''"
      style="max-width: 40rem"
    >
      {{ subtitle }}
    </p>
  </div>
</template>
