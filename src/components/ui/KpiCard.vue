<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
  accent?: boolean
}>()
</script>

<template>
  <v-card :color="accent ? 'primary' : 'surface'" class="pa-5" height="100%">
    <p class="text-caption text-uppercase text-medium-emphasis">{{ label }}</p>
    <p class="display-3 mt-2" :class="accent ? 'text-white' : 'text-high-emphasis'">{{ value }}</p>
  </v-card>
</template>
