<script setup lang="ts">
import { useContentStore } from '@/store/content'
import UiButton from '@/components/ui/UiButton.vue'

const content = useContentStore()
</script>

<template>
  <section class="relative flex min-h-[70vh] items-center overflow-hidden">
    <img
      src="https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=1600&auto=format&fit=crop"
      alt="Atleta treinando em academia escura"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30"></div>

    <div class="container-content relative py-24">
      <div class="max-w-2xl">
        <p class="eyebrow mb-4">Bodybuilding · Força · Performance</p>
        <h1 class="text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl">
          {{ content.config.heroTitle }}
        </h1>
        <p class="mt-6 text-lg text-zinc-300 sm:text-xl">
          {{ content.config.heroSubtitle }}
        </p>
        <div class="mt-8 flex flex-col gap-4 sm:flex-row">
          <UiButton to="/contato">{{ content.config.heroCta }}</UiButton>
          <UiButton variant="outline" to="/programas">Conheça os programas</UiButton>
        </div>

        <div class="mt-12 grid grid-cols-3 gap-6 border-t border-ink-500 pt-8">
          <div>
            <p class="font-display text-3xl font-bold text-primary sm:text-4xl">+15</p>
            <p class="mt-1 text-sm text-zinc-400">Anos de experiência</p>
          </div>
          <div>
            <p class="font-display text-3xl font-bold text-primary sm:text-4xl">+800</p>
            <p class="mt-1 text-sm text-zinc-400">Atletas formados</p>
          </div>
          <div>
            <p class="font-display text-3xl font-bold text-primary sm:text-4xl">24/7</p>
            <p class="mt-1 text-sm text-zinc-400">Estrutura completa</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
