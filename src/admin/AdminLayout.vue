<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const auth = useAuth()
const router = useRouter()
const drawer = ref(true)
const base = import.meta.env.BASE_URL

const nav = [
  { to: '/admin', label: 'Dashboard', icon: 'mdi-view-dashboard-outline', adminOnly: false },
  { to: '/admin/posts', label: 'Posts', icon: 'mdi-post-outline', adminOnly: false },
  { to: '/admin/equipe', label: 'Equipe', icon: 'mdi-account-group-outline', adminOnly: false },
  { to: '/admin/depoimentos', label: 'Depoimentos', icon: 'mdi-comment-quote-outline', adminOnly: false },
  { to: '/admin/programas', label: 'Programas', icon: 'mdi-dumbbell', adminOnly: false },
  { to: '/admin/config', label: 'Configurações', icon: 'mdi-cog-outline', adminOnly: false },
  { to: '/admin/mensagens', label: 'Mensagens', icon: 'mdi-email-outline', adminOnly: false },
  { to: '/admin/usuarios', label: 'Usuários', icon: 'mdi-shield-account-outline', adminOnly: true },
  { to: '/admin/financas', label: 'Finanças', icon: 'mdi-finance', adminOnly: true },
  { to: '/admin/erp', label: 'ERP', icon: 'mdi-puzzle-outline', adminOnly: true },
]

const visibleNav = nav.filter((n) => !n.adminOnly || auth.isAdmin)

function logout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div>
    <v-app-bar app color="surface" density="comfortable" class="admin-bar">
      <v-app-bar-nav-icon class="d-lg-none" @click="drawer = !drawer" />
      <span class="font-display text-subtitle-1 text-white">Painel Administrativo</span>
      <v-spacer />
      <span class="text-body-2 text-medium-emphasis mr-3 d-none d-sm-block">{{ auth.user?.name }}</span>
      <v-chip color="primary" size="small" class="text-uppercase">{{ auth.user?.role }}</v-chip>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :permanent="$vuetify.display.lgAndUp"
      :temporary="!$vuetify.display.lgAndUp"
      color="surface"
      width="260"
    >
      <div class="d-flex align-center pa-4">
        <img :src="base + 'logo.png'" alt="Logo" class="admin-logo" />
        <span class="font-display text-subtitle-2 text-white ml-3">Spartan Admin</span>
      </div>
      <v-divider />

      <v-list nav class="pa-2">
        <v-list-item
          v-for="item in visibleNav"
          :key="item.to"
          :to="item.to"
          :prepend-icon="item.icon"
          :title="item.label"
          rounded="lg"
          class="mb-1"
          active-color="primary"
        />
      </v-list>

      <template #append>
        <v-divider />
        <v-list nav class="pa-2">
          <v-list-item to="/" prepend-icon="mdi-open-in-new" title="Ver site" rounded="lg" />
          <v-list-item prepend-icon="mdi-logout" title="Sair" rounded="lg" color="error" @click="logout" />
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-main>
      <div class="pa-4 pa-md-6">
        <RouterView />
      </div>
    </v-main>
  </div>
</template>

<style scoped>
.admin-logo {
  height: 34px;
  width: auto;
}

.admin-bar {
  border-bottom: 1px solid #1a1f27;
}
</style>
