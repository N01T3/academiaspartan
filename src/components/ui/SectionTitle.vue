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
    <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">{{ title }}</h2>
    <p v-if="subtitle" class="mt-4 max-w-2xl text-zinc-400" :class="align === 'center' ? 'mx-auto' : ''">
      {{ subtitle }}
    </p>
  </div>
</template>
