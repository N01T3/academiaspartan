<script setup lang="ts">
import type { TeamMember } from '@/types'

defineProps<{
  member: TeamMember
}>()
</script>

<template>
  <v-card class="lift overflow-hidden" height="100%">
    <div class="team-media">
      <v-img :src="member.image" :alt="member.name" cover aspect-ratio="3/4" />
      <div class="team-grad"></div>
    </div>
    <v-card-text>
      <h3 class="text-h6">{{ member.name }}</h3>
      <p class="text-caption text-uppercase text-secondary font-weight-bold mt-1">{{ member.role }}</p>
      <p class="text-body-2 text-medium-emphasis mt-3">{{ member.bio }}</p>
      <div class="d-flex flex-wrap ga-1 mt-3">
        <v-chip
          v-for="cred in member.credentials"
          :key="cred"
          size="x-small"
          variant="tonal"
          color="surface-bright"
        >
          {{ cred }}
        </v-chip>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.team-media {
  position: relative;
}

.team-grad {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(11, 13, 16, 0.85), transparent 55%);
}
</style>
