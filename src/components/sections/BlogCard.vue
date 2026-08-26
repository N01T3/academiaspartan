<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { formatDate } from '@/utils/format'
import type { BlogPost } from '@/types'

defineProps<{
  post: BlogPost
}>()
</script>

<template>
  <RouterLink
    :to="`/blog/${post.slug}`"
    class="group overflow-hidden rounded-lg border border-ink-500 bg-ink-800 transition-colors hover:border-primary"
  >
    <div class="relative aspect-[16/9] overflow-hidden">
      <img
        :src="post.image"
        :alt="post.title"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <span
        class="absolute left-4 top-4 rounded bg-ink/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white"
      >
        {{ post.category }}
      </span>
    </div>
    <div class="p-6">
      <p class="text-xs text-zinc-500">{{ formatDate(post.publishedAt) }} · {{ post.author }}</p>
      <h3 class="mt-2 text-lg font-bold text-white transition-colors group-hover:text-primary">
        {{ post.title }}
      </h3>
      <p class="mt-2 line-clamp-3 text-sm text-zinc-400">{{ post.excerpt }}</p>
    </div>
  </RouterLink>
</template>
