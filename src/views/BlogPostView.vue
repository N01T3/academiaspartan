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
      <section class="relative flex min-h-[40vh] items-end overflow-hidden">
        <img :src="post.image" :alt="post.title" class="absolute inset-0 h-full w-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20"></div>
        <div class="container-content relative py-16">
          <span class="rounded bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
            {{ post.category }}
          </span>
          <h1 class="mt-4 max-w-3xl text-3xl font-bold text-white sm:text-5xl">{{ post.title }}</h1>
          <p class="mt-4 text-zinc-300">{{ formatDate(post.publishedAt) }} · {{ post.author }}</p>
        </div>
      </section>

      <article class="section">
        <div class="container-content max-w-3xl">
          <div
            class="prose prose-invert max-w-none prose-p:text-zinc-300 prose-headings:text-white prose-headings:font-display prose-headings:uppercase"
          >
            <p v-for="(par, i) in post.content.split('\n\n')" :key="i">{{ par }}</p>
          </div>

          <div class="mt-12 border-t border-ink-600 pt-8">
            <UiButton variant="outline" @click="router.back()">Voltar ao blog</UiButton>
          </div>
        </div>
      </article>
    </template>

    <section v-else class="section">
      <div class="container-content text-center">
        <h1 class="text-3xl font-bold text-white">Artigo não encontrado</h1>
        <p class="mt-4 text-zinc-400">
          O artigo que você procura pode ter sido removido ou ainda não foi publicado.
        </p>
        <div class="mt-8 flex justify-center">
          <UiButton to="/blog">Ver todos os artigos</UiButton>
        </div>
      </div>
    </section>
  </div>
</template>
