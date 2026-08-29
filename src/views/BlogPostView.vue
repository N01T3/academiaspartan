<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContentStore } from '@/store/content'
import UiButton from '@/components/ui/UiButton.vue'
import { formatDate } from '@/utils/format'
import { useMeta } from '@/composables/useMeta'

const route = useRoute()
const router = useRouter()
const content = useContentStore()

const post = computed(() => content.posts.find((p) => p.slug === route.params.slug && p.published))

useMeta({
  title: post.value ? `${post.value.title} — Academia Spartan` : 'Artigo — Academia Spartan',
  description: post.value?.excerpt ?? '',
})
</script>

<template>
  <div>
    <template v-if="post">
      <section class="post-hero">
        <v-img :src="post.image" :alt="post.title" cover height="380" class="post-img" />
        <div class="post-hero-overlay"></div>
        <div class="container-content post-hero-content">
          <v-chip color="primary" size="small" class="text-uppercase">{{ post.category }}</v-chip>
          <h1 class="display-2 mt-4" style="max-width: 48rem">{{ post.title }}</h1>
          <p class="text-body-2 text-medium-emphasis mt-3">
            {{ formatDate(post.publishedAt) }} · {{ post.author }}
          </p>
        </div>
      </section>

      <article class="section">
        <div class="container-content" style="max-width: 46rem">
          <div class="post-body">
            <p
              v-for="(par, i) in post.content.split('\n\n')"
              :key="i"
              class="text-body-1 text-medium-emphasis mb-4"
            >
              {{ par }}
            </p>
          </div>
          <v-divider class="my-8" />
          <UiButton variant="outline" @click="router.back()">Voltar ao blog</UiButton>
        </div>
      </article>
    </template>

    <section v-else class="section">
      <div class="container-content text-center">
        <h1 class="display-2">Artigo não encontrado</h1>
        <p class="text-medium-emphasis mt-4">
          O artigo que você procura pode ter sido removido ou ainda não foi publicado.
        </p>
        <div class="mt-6 d-flex justify-center">
          <UiButton to="/blog">Ver todos os artigos</UiButton>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.post-hero {
  position: relative;
}

.post-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, #0b0d10 0%, rgba(11, 13, 16, 0.5) 60%, rgba(11, 13, 16, 0.2) 100%);
}

.post-hero-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 2rem;
}
</style>
