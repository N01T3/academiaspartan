<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const links = [
  { to: '/', label: 'Início' },
  { to: '/equipe', label: 'Equipe' },
  { to: '/estrutura', label: 'Estrutura' },
  { to: '/programas', label: 'Programas' },
  { to: '/blog', label: 'Blog' },
  { to: '/contato', label: 'Contato' },
]

const open = ref(false)
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-ink-600 bg-ink/90 backdrop-blur">
    <div class="container-content flex h-16 items-center justify-between sm:h-20">
      <RouterLink to="/" class="flex items-center gap-3" @click="open = false">
        <img src="/logo.png" alt="Logo Academia Spartan" class="h-10 w-auto sm:h-12" />
        <span class="font-display text-lg font-bold uppercase tracking-widest text-white sm:text-xl">
          Academia <span class="text-primary">Spartan</span>
        </span>
      </RouterLink>

      <nav class="hidden items-center gap-8 lg:flex">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="font-display text-sm uppercase tracking-widest text-zinc-300 transition-colors hover:text-primary"
          active-class="text-primary"
          :exact-active-class="link.to === '/' ? 'text-primary' : ''"
        >
          {{ link.label }}
        </RouterLink>
        <RouterLink to="/contato" class="btn-primary !px-5 !py-2">Aula grátis</RouterLink>
      </nav>

      <button type="button" class="text-white lg:hidden" aria-label="Abrir menu" @click="open = !open">
        <svg
          v-if="!open"
          class="h-7 w-7"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <Transition name="fade">
      <nav v-if="open" class="border-t border-ink-600 bg-ink-800 lg:hidden">
        <div class="container-content flex flex-col py-4">
          <RouterLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="border-b border-ink-600 py-3 font-display text-base uppercase tracking-widest text-zinc-200 hover:text-primary"
            active-class="text-primary"
            @click="open = false"
          >
            {{ link.label }}
          </RouterLink>
          <RouterLink to="/contato" class="btn-primary mt-4" @click="open = false"
            >Agende uma aula grátis</RouterLink
          >
        </div>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
