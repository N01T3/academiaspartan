<script setup lang="ts">
import type { Program } from '@/types'

defineProps<{
  program: Program
}>()
</script>

<template>
  <article class="group overflow-hidden rounded-lg border border-ink-500 bg-ink-800">
    <div class="relative aspect-[16/10] overflow-hidden">
      <img
        :src="program.image"
        :alt="program.title"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <span
        class="absolute left-4 top-4 rounded bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white"
      >
        {{ program.tag }}
      </span>
    </div>
    <div class="p-6">
      <h3 class="text-xl font-bold text-white">{{ program.title }}</h3>
      <p class="mt-3 text-sm text-zinc-400">{{ program.description }}</p>
      <ul class="mt-4 space-y-2">
        <li
          v-for="feature in program.features"
          :key="feature"
          class="flex items-center gap-2 text-sm text-zinc-300"
        >
          <svg
            class="h-4 w-4 shrink-0 text-accent"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          {{ feature }}
        </li>
      </ul>
    </div>
  </article>
</template>
