<script setup lang="ts">
import { useContentStore } from '@/store/content'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import TeamCard from '@/components/sections/TeamCard.vue'
import { useMeta } from '@/composables/useMeta'
import { useReveal } from '@/composables/useReveal'

useMeta({ title: 'Equipe — Academia Spartan', description: 'Conheça nossos treinadores e profissionais.' })

const content = useContentStore()
const { reveal } = useReveal()
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="container-content">
        <SectionTitle
          eyebrow="Equipe"
          title="Os profissionais que fazem a Spartan"
          subtitle="Treinadores, nutricionistas e preparadores com credenciais comprovadas e foco em resultados."
        />
      </div>
    </section>

    <section class="section">
      <div class="container-content">
        <v-row>
          <v-col v-for="(member, i) in content.team" :key="member.id" cols="12" sm="6" lg="3">
            <div class="reveal h-100" v-intersect="reveal" :data-reveal-delay="i * 90">
              <TeamCard :member="member" />
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
</style>
