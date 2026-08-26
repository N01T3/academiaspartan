<script setup lang="ts">
import type { Testimonial } from '@/types'

defineProps<{
  testimonial: Testimonial
}>()
</script>

<template>
  <figure class="card flex flex-col">
    <svg class="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M9.6 4C5.9 6 3.5 9.3 3.5 13.4c0 3.4 2.1 5.6 4.7 5.6 2.3 0 4.1-1.8 4.1-4 0-2.2-1.6-3.7-3.6-3.7-.4 0-.9.1-1 .1.3-2 1.7-3.9 3.3-4.9L9.6 4Zm10 0c-3.7 2-6.1 5.3-6.1 9.4 0 3.4 2.1 5.6 4.7 5.6 2.3 0 4.1-1.8 4.1-4 0-2.2-1.6-3.7-3.6-3.7-.4 0-.9.1-1 .1.3-2 1.7-3.9 3.3-4.9L19.6 4Z"
      />
    </svg>
    <blockquote class="mt-4 flex-1 text-zinc-300">{{ testimonial.quote }}</blockquote>
    <figcaption class="mt-6 flex items-center gap-3 border-t border-ink-600 pt-4">
      <img
        :src="testimonial.image"
        :alt="testimonial.name"
        class="h-12 w-12 rounded-full object-cover"
        loading="lazy"
      />
      <div>
        <p class="font-bold text-white">{{ testimonial.name }}</p>
        <p class="text-sm text-accent">{{ testimonial.role }}</p>
      </div>
    </figcaption>
  </figure>
</template>
