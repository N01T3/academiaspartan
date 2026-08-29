<script setup lang="ts">
import { computed, ref } from 'vue'
import { useContentStore } from '@/store/content'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import BlogCard from '@/components/sections/BlogCard.vue'
import { useMeta } from '@/composables/useMeta'
import { useReveal } from '@/composables/useReveal'

useMeta({
  title: 'Blog — Academia Spartan',
  description: 'Artigos sobre treinamento, nutrição e performance.',
})

const content = useContentStore()
const { reveal } = useReveal()
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
    <section class="page-hero">
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
        <div class="reveal mb-8" v-intersect="reveal">
          <v-btn-toggle v-model="category" color="primary" mandatory rounded="xl" class="flex-wrap">
            <v-btn
              v-for="cat in categories"
              :key="cat"
              :value="cat"
              variant="tonal"
              class="text-uppercase filter-btn"
            >
              {{ cat }}
            </v-btn>
          </v-btn-toggle>
        </div>

        <v-row v-if="filtered.length">
          <v-col v-for="(post, i) in filtered" :key="post.id" cols="12" sm="6" lg="4">
            <div class="reveal h-100" v-intersect="reveal" :data-reveal-delay="i * 90">
              <BlogCard :post="post" />
            </div>
          </v-col>
        </v-row>
        <p v-else class="text-medium-emphasis">Nenhum artigo publicado nesta categoria ainda.</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-hero {
  padding: 4rem 0;
  background: linear-gradient(180deg, #14181e 0%, #0b0d10 100%);
  border-bottom: 1px solid #1a1f27;
}

.filter-btn {
  margin: 4px;
}
</style>
