<script setup lang="ts">
import { useContentStore } from '@/store/content'
import HeroSection from '@/components/sections/HeroSection.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ProgramCard from '@/components/sections/ProgramCard.vue'
import TestimonialCard from '@/components/sections/TestimonialCard.vue'
import UiButton from '@/components/ui/UiButton.vue'
import { useMeta } from '@/composables/useMeta'
import { useReveal } from '@/composables/useReveal'

useMeta({
  title: 'Academia Spartan — Força, Foco e Resultado',
  description: 'Centro de treinamento focado em bodybuilding, força e performance.',
})

const content = useContentStore()
const { reveal } = useReveal()

const diferenciais = [
  {
    icon: 'mdi-account-star',
    title: 'Treinadores especializados',
    desc: 'Equipe com credenciais e foco em atletas de alto rendimento.',
  },
  {
    icon: 'mdi-trophy',
    title: 'Foco em atletas',
    desc: 'Preparação completa para competições de bodybuilding e força.',
  },
  {
    icon: 'mdi-dumbbell',
    title: 'Estrutura premium',
    desc: 'Equipamentos modernos e ambiente pensado para performance.',
  },
  {
    icon: 'mdi-heart-pulse',
    title: 'Acompanhamento real',
    desc: 'Avaliações periódicas e planos individualizados.',
  },
]
</script>

<template>
  <div>
    <HeroSection />

    <section class="section">
      <div class="container-content">
        <div class="reveal" v-intersect="reveal">
          <SectionTitle
            eyebrow="Por que a Spartan"
            title="Treino com propósito"
            subtitle="Não somos apenas uma academia. Somos um centro de formação de atletas, com metodologia própria e acompanhamento de verdade."
            align="center"
          />
        </div>
        <v-row class="mt-8">
          <v-col v-for="(d, i) in diferenciais" :key="d.title" cols="12" sm="6" lg="3">
            <div class="reveal lift h-100" v-intersect="reveal" :data-reveal-delay="i * 90">
              <v-card class="pa-5 pa-md-6 h-100 d-flex flex-column" variant="tonal" color="surface-variant">
                <v-icon :icon="d.icon" color="primary" size="32" />
                <h3 class="text-h6 mt-4 text-high-emphasis">{{ d.title }}</h3>
                <p class="text-body-2 text-medium-emphasis mt-2 flex-grow-1">{{ d.desc }}</p>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </div>
    </section>

    <section class="section bg-surface">
      <div class="container-content">
        <div
          class="reveal d-flex flex-column flex-md-row align-md-end justify-space-between ga-4"
          v-intersect="reveal"
        >
          <SectionTitle eyebrow="Modalidades" title="Nossos programas" />
          <UiButton variant="outline" to="/programas">Ver todos</UiButton>
        </div>
        <v-row class="mt-8">
          <v-col v-for="(p, i) in content.programs" :key="p.id" cols="12" sm="6" lg="3">
            <div class="reveal h-100" v-intersect="reveal" :data-reveal-delay="i * 90">
              <ProgramCard :program="p" />
            </div>
          </v-col>
        </v-row>
      </div>
    </section>

    <section class="section">
      <div class="container-content">
        <div class="reveal" v-intersect="reveal">
          <SectionTitle eyebrow="Depoimentos" title="Resultados reais" align="center" />
        </div>
        <v-row class="mt-8">
          <v-col v-for="(t, i) in content.testimonials" :key="t.id" cols="12" sm="6" lg="4">
            <div class="reveal h-100" v-intersect="reveal" :data-reveal-delay="i * 90">
              <TestimonialCard :testimonial="t" />
            </div>
          </v-col>
        </v-row>
      </div>
    </section>

    <section class="cta-band">
      <div class="container-content text-center py-12">
        <div class="reveal" v-intersect="reveal">
          <h2 class="display-2 text-white">Pronto para começar?</h2>
          <p class="text-body-1 mt-3 mx-auto" style="max-width: 36rem; color: rgba(255, 255, 255, 0.85)">
            Agende sua aula experimental grátis e conheça a estrutura e a metodologia Spartan de perto.
          </p>
          <div class="mt-6">
            <UiButton variant="accent" to="/contato" size="large">Agende uma aula grátis</UiButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.bg-surface {
  background-color: #0f1216;
}

.cta-band {
  background: linear-gradient(135deg, #e11d2e 0%, #b9061d 50%, #7a0b16 100%);
}
</style>
