<script setup lang="ts">
import { computed, ref } from 'vue'
import { useContentStore } from '@/store/content'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import BlogCard from '@/components/sections/BlogCard.vue'
import { useMeta } from '@/composables/useMeta'

useMeta({
  title: 'Blog — Academia Spartan',
  description: 'Artigos sobre treinamento, nutrição e performance.',
})

const content = useContentStore()
const category = ref('Todos')

const categories = computed(() => {
  const cats = new Set(content.posts.filter((p) => p.published).map((p) => p.category))
  return ['Todos', ...cats]
})

const filtered = computed(() => {
  const list = content.posts.filter((p) => p.published)
  if (category.value === 'Todos') return list
  return list.filter((p) => p.category === category.value)
})
</script>

<template>
  <div>
    <section class="border-b border-ink-600 bg-ink-800 py-16 sm:py-20">
      <div class="container-content">
        <SectionTitle
          eyebrow="Blog"
          title="Conteúdo e autoridade"
          subtitle="Artigos sobre treinamento, nutrição e eventos para elevar seu conhecimento."
        />
      </div>
    </section>

    <section class="section">
      <div class="container-content">
        <div class="mb-10 flex flex-wrap gap-2">
          <button
            v-for="cat in categories"
            :key="cat"
            type="button"
            class="rounded-full border px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-colors"
            :class="
              category === cat
                ? 'border-primary bg-primary text-white'
                : 'border-ink-500 text-zinc-300 hover:border-primary hover:text-primary'
            "
            @click="category = cat"
          >
            {{ cat }}
          </button>
        </div>

        <div v-if="filtered.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <BlogCard v-for="post in filtered" :key="post.id" :post="post" />
        </div>
        <p v-else class="text-zinc-400">Nenhum artigo publicado nesta categoria ainda.</p>
      </div>
    </section>
  </div>
</template>
