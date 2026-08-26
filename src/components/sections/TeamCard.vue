<script setup lang="ts">
import type { TeamMember } from '@/types'

defineProps<{
  member: TeamMember
}>()
</script>

<template>
  <article class="group overflow-hidden rounded-lg border border-ink-500 bg-ink-800">
    <div class="relative aspect-[3/4] overflow-hidden">
      <img
        :src="member.image"
        :alt="member.name"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent"></div>
    </div>
    <div class="p-6">
      <h3 class="text-xl font-bold text-white">{{ member.name }}</h3>
      <p class="mt-1 text-sm font-semibold uppercase tracking-wider text-accent">{{ member.role }}</p>
      <p class="mt-3 text-sm text-zinc-400">{{ member.bio }}</p>
      <ul class="mt-4 flex flex-wrap gap-2">
        <li
          v-for="cred in member.credentials"
          :key="cred"
          class="rounded bg-ink-700 px-2 py-1 text-xs text-zinc-300"
        >
          {{ cred }}
        </li>
      </ul>
    </div>
  </article>
</template>
