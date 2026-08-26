<script setup lang="ts">
import { ref } from 'vue'

const links = [
  { to: '/', label: 'Início' },
  { to: '/equipe', label: 'Equipe' },
  { to: '/estrutura', label: 'Estrutura' },
  { to: '/programas', label: 'Programas' },
  { to: '/blog', label: 'Blog' },
  { to: '/contato', label: 'Contato' },
]

const drawer = ref(false)
const base = import.meta.env.BASE_URL
</script>

<template>
  <v-app-bar app color="background" class="spartan-header" density="comfortable">
    <div class="container-content d-flex align-center justify-space-between">
      <RouterLink to="/" class="d-flex align-center text-decoration-none" @click="drawer = false">
        <img :src="base + 'logo.png'" alt="Logo Academia Spartan" class="header-logo" />
        <span class="font-display text-h6 ml-3 text-white">
          Academia <span class="text-primary">Spartan</span>
        </span>
      </RouterLink>

      <nav class="d-none d-lg-flex align-center ga-6">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="nav-link font-display text-uppercase"
        >
          {{ link.label }}
        </RouterLink>
        <v-btn color="primary" to="/contato" class="text-uppercase font-weight-bold pulse" size="small">
          Aula grátis
        </v-btn>
      </nav>

      <v-app-bar-nav-icon class="d-lg-none" aria-label="Abrir menu" @click="drawer = !drawer" />
    </div>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary location="right" width="300">
    <v-list nav>
      <v-list-item
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        :title="link.label"
        @click="drawer = false"
      />
      <v-list-item to="/contato" @click="drawer = false">
        <v-btn color="primary" block class="text-uppercase">Aula grátis</v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.spartan-header {
  background: rgba(11, 13, 16, 0.82) !important;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #1a1f27;
}

.header-logo {
  height: 38px;
  width: auto;
}

.nav-link {
  color: #c4c6cc;
  font-size: 0.82rem;
  letter-spacing: 0.16em;
  text-decoration: none;
  transition: color 150ms cubic-bezier(0.2, 0, 0, 1);
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #e11d2e;
}
</style>
