<script setup lang="ts">
import { useContentStore } from '@/store/content'
import HeroSection from '@/components/sections/HeroSection.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ProgramCard from '@/components/sections/ProgramCard.vue'
import TestimonialCard from '@/components/sections/TestimonialCard.vue'
import UiButton from '@/components/ui/UiButton.vue'
import { useMeta } from '@/composables/useMeta'

useMeta({
  title: 'Academia Spartan — Força, Foco e Resultado',
  description: 'Centro de treinamento focado em bodybuilding, força e performance.',
})

const content = useContentStore()

const diferenciais = [
  {
    title: 'Treinadores especializados',
    desc: 'Equipe com credenciais e foco em atletas de alto rendimento.',
  },
  { title: 'Foco em atletas', desc: 'Preparação completa para competições de bodybuilding e força.' },
  { title: 'Estrutura premium', desc: 'Equipamentos modernos e ambiente pensado para performance.' },
  { title: 'Acompanhamento real', desc: 'Avaliações periódicas e planos individualizados.' },
]
</script>

<template>
  <div>
    <HeroSection />

    <section class="section">
      <div class="container-content">
        <SectionTitle
          eyebrow="Por que a Spartan"
          title="Treino com propósito"
          subtitle="Não somos apenas uma academia. Somos um centro de formação de atletas, com metodologia própria e acompanhamento de verdade."
          align="center"
        />
        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="d in diferenciais" :key="d.title" class="card">
            <h3 class="text-lg font-bold text-white">{{ d.title }}</h3>
            <p class="mt-2 text-sm text-zinc-400">{{ d.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section bg-ink-800">
      <div class="container-content">
        <div class="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionTitle eyebrow="Modalidades" title="Nossos programas" />
          <UiButton variant="outline" to="/programas">Ver todos</UiButton>
        </div>
        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ProgramCard v-for="p in content.programs" :key="p.id" :program="p" />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container-content">
        <SectionTitle eyebrow="Depoimentos" title="Resultados reais" align="center" />
        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <TestimonialCard v-for="t in content.testimonials" :key="t.id" :testimonial="t" />
        </div>
      </div>
    </section>

    <section class="section bg-primary">
      <div class="container-content flex flex-col items-center gap-6 text-center">
        <h2 class="text-3xl font-bold text-white sm:text-4xl">Pronto para começar?</h2>
        <p class="max-w-xl text-white/90">
          Agende sua aula experimental grátis e conheça a estrutura e a metodologia Spartan de perto.
        </p>
        <UiButton variant="accent" to="/contato">Agende uma aula grátis</UiButton>
      </div>
    </section>
  </div>
</template>
