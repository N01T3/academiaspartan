<script setup lang="ts">
import { useContentStore } from '@/store/content'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { useMeta } from '@/composables/useMeta'
import { useReveal } from '@/composables/useReveal'

useMeta({ title: 'Estrutura — Academia Spartan', description: 'Conheça nossa estrutura completa.' })

const content = useContentStore()
const { reveal } = useReveal()
</script>

<template>
  <div>
    <section class="page-hero">
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
        <v-row>
          <v-col v-for="(img, i) in content.gallery" :key="img.id" cols="12" sm="6" lg="4">
            <div class="reveal" v-intersect="reveal" :data-reveal-delay="i * 80">
              <v-card class="overflow-hidden lift">
                <v-img :src="img.src" :alt="img.alt" cover aspect-ratio="1" />
                <v-card-text>
                  <p class="text-body-2 text-high-emphasis">{{ img.alt }}</p>
                </v-card-text>
              </v-card>
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
