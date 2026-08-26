<script setup lang="ts">
import { formatDate } from '@/utils/format'
import type { BlogPost } from '@/types'

defineProps<{
  post: BlogPost
}>()
</script>

<template>
  <v-card :to="`/blog/${post.slug}`" class="lift overflow-hidden text-decoration-none" height="100%">
    <div class="blog-media">
      <v-img :src="post.image" :alt="post.title" cover aspect-ratio="16/9" />
      <v-chip color="background" size="small" class="blog-tag text-uppercase">
        {{ post.category }}
      </v-chip>
    </div>
    <v-card-text>
      <p class="text-caption text-medium-emphasis">{{ formatDate(post.publishedAt) }} · {{ post.author }}</p>
      <h3 class="text-subtitle-1 font-weight-bold mt-1">{{ post.title }}</h3>
      <p
        class="text-body-2 text-medium-emphasis mt-2"
        style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden"
      >
        {{ post.excerpt }}
      </p>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.blog-media {
  position: relative;
}

.blog-tag {
  position: absolute;
  top: 12px;
  left: 12px;
}
</style>
