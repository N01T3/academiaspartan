<script setup lang="ts">
import { useContentStore } from '@/store/content'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import TeamCard from '@/components/sections/TeamCard.vue'
import { useMeta } from '@/composables/useMeta'

useMeta({ title: 'Equipe — Academia Spartan', description: 'Conheça nossos treinadores e profissionais.' })

const content = useContentStore()
</script>

<template>
  <div>
    <section class="border-b border-ink-600 bg-ink-800 py-16 sm:py-20">
      <div class="container-content">
        <SectionTitle
          eyebrow="Equipe"
          title="Os profissionais que fazem a Spartan"
          subtitle="Treinadores, nutricionistas e preparadores com credenciais comprovadas e foco em resultados."
        />
      </div>
    </section>

    <section class="section">
      <div class="container-content grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <TeamCard v-for="member in content.team" :key="member.id" :member="member" />
      </div>
    </section>
  </div>
</template>
