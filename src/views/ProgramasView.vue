<script setup lang="ts">
import { useContentStore } from '@/store/content'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ProgramCard from '@/components/sections/ProgramCard.vue'
import TestimonialCard from '@/components/sections/TestimonialCard.vue'
import { useMeta } from '@/composables/useMeta'

useMeta({
  title: 'Programas & Bodybuilding — Academia Spartan',
  description: 'Bodybuilding, musculação, atletismo de força e condicionamento.',
})

const content = useContentStore()
</script>

<template>
  <div>
    <section class="border-b border-ink-600 bg-ink-800 py-16 sm:py-20">
      <div class="container-content">
        <SectionTitle
          eyebrow="Modalidades"
          title="Programas e Bodybuilding"
          subtitle="Do iniciante ao atleta de competição, temos um programa estruturado para cada objetivo."
        />
      </div>
    </section>

    <section class="section">
      <div class="container-content grid gap-6 sm:grid-cols-2">
        <ProgramCard v-for="p in content.programs" :key="p.id" :program="p" />
      </div>
    </section>

    <section class="section bg-ink-800">
      <div class="container-content">
        <SectionTitle eyebrow="Casos de sucesso" title="Quem treina aqui, evolui" align="center" />
        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <TestimonialCard v-for="t in content.testimonials" :key="t.id" :testimonial="t" />
        </div>
      </div>
    </section>
  </div>
</template>
