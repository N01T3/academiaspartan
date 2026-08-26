<script setup lang="ts">
import { useContentStore } from '@/store/content'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { useMeta } from '@/composables/useMeta'

useMeta({ title: 'Estrutura — Academia Spartan', description: 'Conheça nossa estrutura completa.' })

const content = useContentStore()
</script>

<template>
  <div>
    <section class="border-b border-ink-600 bg-ink-800 py-16 sm:py-20">
      <div class="container-content">
        <SectionTitle
          eyebrow="Estrutura"
          title="Ambiente feito para performance"
          subtitle="Equipamentos modernos, áreas dedicadas e uma estrutura completa para atender do iniciante ao atleta."
        />
      </div>
    </section>

    <section class="section">
      <div class="container-content">
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="img in content.gallery"
            :key="img.id"
            class="group relative aspect-square overflow-hidden rounded-lg"
          >
            <img
              :src="img.src"
              :alt="img.alt"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div
              class="absolute inset-0 flex items-end bg-gradient-to-t from-ink/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
            >
              <p class="p-4 font-semibold text-white">{{ img.alt }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
