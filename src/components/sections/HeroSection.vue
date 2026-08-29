<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useContentStore } from '@/store/content'
import UiButton from '@/components/ui/UiButton.vue'
import { useCountUp } from '@/composables/useCountUp'

const content = useContentStore()

const heroImages = [
  {
    src: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=1600&auto=format&fit=crop',
    alt: 'Atleta treinando em academia escura',
  },
  {
    src: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=1600&auto=format&fit=crop',
    alt: 'Atleta de bodybuilding treinando',
  },
  {
    src: 'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?q=80&w=1600&auto=format&fit=crop',
    alt: 'Powerlifter realizando levantamento',
  },
]

const ROTATE_MS = 6000
const activeIndex = ref(0)
let timer: number | undefined

function startRotation() {
  stopRotation()
  timer = window.setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % heroImages.length
  }, ROTATE_MS)
}

function stopRotation() {
  if (timer !== undefined) {
    window.clearInterval(timer)
    timer = undefined
  }
}

onMounted(startRotation)
onBeforeUnmount(stopRotation)

const years = useCountUp(15)
const athletes = useCountUp(800)
const started = ref(false)

function onIntersect(isIntersecting: boolean) {
  if (isIntersecting && !started.value) {
    started.value = true
    years.start()
    athletes.start()
  }
}
</script>

<template>
  <section class="hero">
    <div class="hero-media">
      <img
        v-for="(img, i) in heroImages"
        :key="img.src"
        :src="img.src"
        :alt="img.alt"
        class="hero-bg"
        :class="{ 'is-active': i === activeIndex }"
      />
      <div class="hero-overlay"></div>
    </div>

    <div class="container-content hero-content">
      <div class="hero-inner">
        <p class="eyebrow hero-enter" style="animation-delay: 0.05s">Bodybuilding · Força · Performance</p>
        <h1 class="display-1 hero-enter hero-text-shadow" style="animation-delay: 0.15s">
          <span class="text-gradient">{{ content.config.heroTitle }}</span>
        </h1>
        <p
          class="text-body-1 text-high-emphasis hero-enter hero-text-shadow"
          style="animation-delay: 0.28s; max-width: 34rem"
        >
          {{ content.config.heroSubtitle }}
        </p>
        <div class="d-flex flex-wrap ga-3 mt-7 hero-enter" style="animation-delay: 0.4s">
          <UiButton to="/contato" size="large" class="pulse">{{ content.config.heroCta }}</UiButton>
          <UiButton variant="outline" to="/programas" size="large">Conheça os programas</UiButton>
        </div>

        <div v-intersect="onIntersect" class="hero-stats hero-enter" style="animation-delay: 0.55s">
          <div class="hero-stat">
            <p class="hero-stat-value">+{{ years.value }}</p>
            <p class="text-caption text-high-emphasis">Anos de experiência</p>
          </div>
          <v-divider vertical class="hero-stat-divider" />
          <div class="hero-stat">
            <p class="hero-stat-value">+{{ athletes.value }}</p>
            <p class="text-caption text-high-emphasis">Atletas formados</p>
          </div>
          <v-divider vertical class="hero-stat-divider" />
          <div class="hero-stat">
            <p class="hero-stat-value">24/7</p>
            <p class="text-caption text-high-emphasis">Estrutura completa</p>
          </div>
        </div>
      </div>
    </div>

    <div class="hero-marquee">
      <div class="marquee-track">
        <span v-for="i in 6" :key="i" class="marquee-content">
          FORÇA <em>•</em> FOCO <em>•</em> RESULTADO <em>•</em> DISCIPLINA <em>•</em> EVOLUÇÃO <em>•</em>
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-media {
  position: absolute;
  inset: 0;
}

.hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 1200ms ease;
  will-change: opacity;
}

.hero-bg.is-active {
  opacity: 1;
  animation: kenburns 18s ease-in-out infinite alternate;
}

@keyframes kenburns {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.12);
  }
}

.hero-content {
  position: relative;
  z-index: 2;
  padding-top: 120px;
  padding-bottom: 90px;
}

.hero-inner {
  max-width: 46rem;
}

.hero-enter {
  opacity: 0;
  animation: fade-up 700ms cubic-bezier(0.2, 0, 0, 1) forwards;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #1a1f27;
}

.hero-stat-value {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 700;
  color: #e11d2e;
  line-height: 1;
}

.hero-stat-divider {
  align-self: stretch;
  border-color: #1a1f27;
}

.hero-text-shadow {
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.6);
}

.hero-marquee {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  background: rgba(225, 29, 46, 0.92);
  overflow: hidden;
  padding: 12px 0;
}

.marquee-content {
  font-family: var(--font-display);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: #fff;
  white-space: nowrap;
  padding-right: 2rem;
}

.marquee-content em {
  font-style: normal;
  color: #ffd54d;
}

@media (max-width: 600px) {
  .hero {
    min-height: 88vh;
  }

  .hero-stats {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-stat-divider {
    display: none;
  }
}
</style>
