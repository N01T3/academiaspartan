<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useContentStore } from '@/store/content'
import InstagramFeed from '@/components/layout/InstagramFeed.vue'

const content = useContentStore()

const links = [
  { to: '/', label: 'Início' },
  { to: '/equipe', label: 'Equipe' },
  { to: '/estrutura', label: 'Estrutura' },
  { to: '/programas', label: 'Programas' },
  { to: '/blog', label: 'Blog' },
  { to: '/contato', label: 'Contato' },
]
</script>

<template>
  <footer class="border-t border-ink-600 bg-ink-800">
    <div class="container-content grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <div class="flex items-center gap-3">
          <img src="/logo.png" alt="Logo Academia Spartan" class="h-10 w-auto" />
          <span class="font-display text-lg font-bold uppercase tracking-widest text-white">
            Academia <span class="text-primary">Spartan</span>
          </span>
        </div>
        <p class="mt-4 text-sm text-zinc-400">
          Centro de treinamento focado em força, hipertrofia e performance. Forje seu corpo conosco.
        </p>
      </div>

      <div>
        <h4 class="mb-4 text-sm font-bold uppercase tracking-widest text-white">Navegação</h4>
        <ul class="space-y-2">
          <li v-for="link in links" :key="link.to">
            <RouterLink :to="link.to" class="text-sm text-zinc-400 transition-colors hover:text-primary">
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </div>

      <div>
        <h4 class="mb-4 text-sm font-bold uppercase tracking-widest text-white">Contato</h4>
        <ul class="space-y-2 text-sm text-zinc-400">
          <li>{{ content.config.address }}</li>
          <li>
            <a :href="`tel:${content.config.phone}`" class="transition-colors hover:text-primary">
              {{ content.config.phone }}
            </a>
          </li>
          <li>
            <a :href="`mailto:${content.config.email}`" class="transition-colors hover:text-primary">
              {{ content.config.email }}
            </a>
          </li>
        </ul>
        <div class="mt-4 flex gap-3">
          <a
            :href="content.config.instagram"
            target="_blank"
            rel="noopener"
            aria-label="Instagram"
            class="text-zinc-400 hover:text-primary"
          >
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
          </a>
          <a
            :href="content.config.facebook"
            target="_blank"
            rel="noopener"
            aria-label="Facebook"
            class="text-zinc-400 hover:text-primary"
          >
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z"
              />
            </svg>
          </a>
          <a
            :href="content.config.youtube"
            target="_blank"
            rel="noopener"
            aria-label="YouTube"
            class="text-zinc-400 hover:text-primary"
          >
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z"
              />
            </svg>
          </a>
        </div>
      </div>

      <div>
        <h4 class="mb-4 text-sm font-bold uppercase tracking-widest text-white">Instagram</h4>
        <InstagramFeed />
      </div>
    </div>

    <div class="border-t border-ink-600">
      <div
        class="container-content flex flex-col items-center justify-between gap-2 py-5 text-xs text-zinc-500 sm:flex-row"
      >
        <p>© {{ new Date().getFullYear() }} Academia Spartan. Todos os direitos reservados.</p>
        <RouterLink to="/login" class="transition-colors hover:text-primary">Área administrativa</RouterLink>
      </div>
    </div>
  </footer>
</template>
