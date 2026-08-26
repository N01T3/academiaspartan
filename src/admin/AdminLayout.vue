<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const auth = useAuth()
const router = useRouter()
const open = ref(false)

const nav = [
  { to: '/admin', label: 'Dashboard', icon: 'M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10', adminOnly: false },
  { to: '/admin/posts', label: 'Posts', icon: 'M4 6h16M4 12h16M4 18h10', adminOnly: false },
  {
    to: '/admin/equipe',
    label: 'Equipe',
    icon: 'M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2m8-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8 5v6m3-3h-6',
    adminOnly: false,
  },
  {
    to: '/admin/depoimentos',
    label: 'Depoimentos',
    icon: 'M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
    adminOnly: false,
  },
  {
    to: '/admin/programas',
    label: 'Programas',
    icon: 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2',
    adminOnly: false,
  },
  {
    to: '/admin/config',
    label: 'Configurações',
    icon: 'M10.3 4.3a2 2 0 0 1 3.4 0l.5.9a2 2 0 0 0 2.2.8l1-.3a2 2 0 0 1 2.4 2.4l-.3 1a2 2 0 0 0 .8 2.2l.9.5a2 2 0 0 1 0 3.4l-.9.5a2 2 0 0 0-.8 2.2l.3 1a2 2 0 0 1-2.4 2.4l-1-.3a2 2 0 0 0-2.2.8l-.5.9a2 2 0 0 1-3.4 0l-.5-.9a2 2 0 0 0-2.2-.8l-1 .3a2 2 0 0 1-2.4-2.4l.3-1a2 2 0 0 0-.8-2.2l-.9-.5a2 2 0 0 1 0-3.4l.9-.5a2 2 0 0 0 .8-2.2l-.3-1a2 2 0 0 1 2.4-2.4l1 .3a2 2 0 0 0 2.2-.8l.5-.9ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
    adminOnly: false,
  },
  {
    to: '/admin/mensagens',
    label: 'Mensagens',
    icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m2-10a4 4 0 1 1 6-6.1A4 4 0 0 1 20 9a4 4 0 0 1-6 3.9',
    adminOnly: false,
  },
  {
    to: '/admin/usuarios',
    label: 'Usuários',
    icon: 'M12 4.4l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6L12 4.4Z',
    adminOnly: true,
  },
  {
    to: '/admin/financas',
    label: 'Finanças',
    icon: 'M3 6h18M5 6l1 14h12l1-14M9 10h.01M15 10h.01M9 14h.01M15 14h.01',
    adminOnly: true,
  },
  { to: '/admin/erp', label: 'ERP', icon: 'M4 7h16M4 12h16M4 17h16', adminOnly: true },
]

function logout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="flex min-h-screen bg-ink">
    <aside
      class="fixed inset-y-0 left-0 z-40 w-64 transform border-r border-ink-600 bg-ink-800 transition-transform lg:static lg:translate-x-0"
      :class="open ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex h-16 items-center gap-3 border-b border-ink-600 px-6">
        <img src="/logo.png" alt="Logo" class="h-8 w-auto" />
        <span class="font-display text-sm font-bold uppercase tracking-widest text-white">Admin</span>
      </div>
      <nav class="flex-1 overflow-y-auto p-4">
        <RouterLink
          v-for="item in nav.filter((n) => !n.adminOnly || auth.isAdmin)"
          :key="item.to"
          :to="item.to"
          class="mb-1 flex items-center gap-3 rounded-md px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-ink-700 hover:text-white"
          active-class="bg-primary text-white hover:bg-primary"
          @click="open = false"
        >
          <svg
            class="h-5 w-5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
          </svg>
          {{ item.label }}
        </RouterLink>
      </nav>
      <div class="border-t border-ink-600 p-4">
        <RouterLink
          to="/"
          class="mb-1 flex items-center gap-3 rounded-md px-4 py-2.5 text-sm text-zinc-300 hover:bg-ink-700"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10" />
          </svg>
          Ver site
        </RouterLink>
        <button
          type="button"
          class="flex w-full items-center gap-3 rounded-md px-4 py-2.5 text-sm text-red-400 hover:bg-ink-700"
          @click="logout"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1"
            />
          </svg>
          Sair
        </button>
      </div>
    </aside>

    <div v-if="open" class="fixed inset-0 z-30 bg-black/50 lg:hidden" @click="open = false"></div>

    <div class="flex flex-1 flex-col overflow-hidden">
      <header class="flex h-16 items-center justify-between border-b border-ink-600 bg-ink-800 px-4 sm:px-6">
        <button type="button" class="text-white lg:hidden" aria-label="Abrir menu" @click="open = !open">
          <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div class="hidden text-sm text-zinc-400 lg:block">Painel administrativo — Academia Spartan</div>
        <div class="flex items-center gap-3">
          <span class="hidden text-sm text-zinc-300 sm:block">{{ auth.user?.name }}</span>
          <span class="rounded bg-primary/20 px-2 py-1 text-xs font-bold uppercase text-primary">{{
            auth.user?.role
          }}</span>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto p-4 sm:p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>
