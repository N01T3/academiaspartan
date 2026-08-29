<script setup lang="ts">
import { useContentStore } from '@/store/content'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ProgramCard from '@/components/sections/ProgramCard.vue'
import TestimonialCard from '@/components/sections/TestimonialCard.vue'
import { useMeta } from '@/composables/useMeta'
import { useReveal } from '@/composables/useReveal'

useMeta({
  title: 'Programas & Bodybuilding — Academia Spartan',
  description: 'Bodybuilding, musculação, atletismo de força e condicionamento.',
})

const content = useContentStore()
const { reveal } = useReveal()
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="container-content">
        <SectionTitle
          eyebrow="Modalidades"
          title="Programas e Bodybuilding"
          subtitle="Do iniciante ao atleta de competição, temos um programa estruturado para cada objetivo."
        />
      </div>
    </section>

    <section class="section">
      <div class="container-content">
        <v-row>
          <v-col v-for="(p, i) in content.programs" :key="p.id" cols="12" sm="6">
            <div class="reveal h-100" v-intersect="reveal" :data-reveal-delay="i * 90">
              <ProgramCard :program="p" />
            </div>
          </v-col>
        </v-row>
      </div>
    </section>

    <section class="section bg-surface">
      <div class="container-content">
        <div class="reveal" v-intersect="reveal">
          <SectionTitle eyebrow="Casos de sucesso" title="Quem treina aqui, evolui" align="center" />
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
  </div>
</template>

<style scoped>
.page-hero {
  padding: 4rem 0;
  background: linear-gradient(180deg, #14181e 0%, #0b0d10 100%);
  border-bottom: 1px solid #1a1f27;
}

.bg-surface {
  background-color: #0f1216;
}
</style>
