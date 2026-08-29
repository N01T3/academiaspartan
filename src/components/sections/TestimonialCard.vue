<script setup lang="ts">
import type { Testimonial } from '@/types'

defineProps<{
  testimonial: Testimonial
}>()
</script>

<template>
  <v-card class="lift pa-5" height="100%">
    <v-icon icon="mdi-format-quote-open" color="primary" size="36" />
    <p class="text-body-1 text-high-emphasis mt-3 flex-grow-1">{{ testimonial.quote }}</p>
    <v-divider class="my-4" />
    <div class="d-flex align-center ga-3">
      <v-avatar size="48">
        <v-img :src="testimonial.image" :alt="testimonial.name" cover />
      </v-avatar>
      <div>
        <p class="text-body-2 font-weight-bold">{{ testimonial.name }}</p>
        <p class="text-caption text-secondary">{{ testimonial.role }}</p>
      </div>
    </div>
  </v-card>
</template>
