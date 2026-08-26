<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
  accent?: boolean
}>()
</script>

<template>
  <div class="card" :class="accent ? 'border-primary bg-primary/5' : ''">
    <p class="text-sm uppercase tracking-wider text-zinc-400">{{ label }}</p>
    <p class="mt-2 font-display text-3xl font-bold" :class="accent ? 'text-primary' : 'text-white'">
      {{ value }}
    </p>
  </div>
</template>
