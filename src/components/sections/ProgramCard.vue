<script setup lang="ts">
import type { Program } from '@/types'

defineProps<{
  program: Program
}>()
</script>

<template>
  <v-card class="lift overflow-hidden" height="100%">
    <div class="program-media">
      <v-img :src="program.image" :alt="program.title" cover aspect-ratio="16/10" />
      <v-chip color="primary" size="small" class="program-tag text-uppercase font-weight-bold">
        {{ program.tag }}
      </v-chip>
    </div>
    <v-card-text>
      <h3 class="text-h6">{{ program.title }}</h3>
      <p class="text-body-2 text-medium-emphasis mt-2">{{ program.description }}</p>
      <ul class="mt-4 pa-0" style="list-style: none">
        <li
          v-for="feature in program.features"
          :key="feature"
          class="d-flex align-center ga-2 text-body-2 mb-1"
        >
          <v-icon icon="mdi-check-circle" color="secondary" size="16" />
          <span>{{ feature }}</span>
        </li>
      </ul>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.program-media {
  position: relative;
}

.program-tag {
  position: absolute;
  top: 12px;
  left: 12px;
}
</style>
