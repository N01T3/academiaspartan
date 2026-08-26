<script setup lang="ts">
import { useContentStore } from '@/store/content'
import InstagramFeed from '@/components/layout/InstagramFeed.vue'

const content = useContentStore()
const base = import.meta.env.BASE_URL

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
  <v-footer color="#0f1216" class="border-t spartan-footer">
    <div class="container-content py-10">
      <v-row>
        <v-col cols="12" md="4">
          <div class="d-flex align-center">
            <img :src="base + 'logo.png'" alt="Logo Academia Spartan" class="footer-logo" />
            <span class="font-display text-h6 ml-3 text-white">
              Academia <span class="text-primary">Spartan</span>
            </span>
          </div>
          <p class="text-body-2 text-medium-emphasis mt-4" style="max-width: 20rem">
            Centro de treinamento focado em força, hipertrofia e performance. Forje seu corpo conosco.
          </p>
        </v-col>

        <v-col cols="6" md="2">
          <p class="text-caption text-uppercase font-weight-bold mb-4">Navegação</p>
          <v-list density="compact" class="bg-transparent pa-0">
            <v-list-item
              v-for="link in links"
              :key="link.to"
              :to="link.to"
              :title="link.label"
              class="text-medium-emphasis"
            />
          </v-list>
        </v-col>

        <v-col cols="6" md="3">
          <p class="text-caption text-uppercase font-weight-bold mb-4">Contato</p>
          <ul class="pa-0" style="list-style: none">
            <li class="text-body-2 text-medium-emphasis mb-2">{{ content.config.address }}</li>
            <li class="mb-2">
              <a :href="`tel:${content.config.phone}`" class="text-medium-emphasis text-decoration-none">{{
                content.config.phone
              }}</a>
            </li>
            <li class="mb-3">
              <a :href="`mailto:${content.config.email}`" class="text-medium-emphasis text-decoration-none">{{
                content.config.email
              }}</a>
            </li>
          </ul>
          <div class="d-flex ga-2">
            <v-btn
              :href="content.config.instagram"
              target="_blank"
              rel="noopener"
              icon="mdi-instagram"
              variant="text"
              size="small"
              aria-label="Instagram"
            />
            <v-btn
              :href="content.config.facebook"
              target="_blank"
              rel="noopener"
              icon="mdi-facebook"
              variant="text"
              size="small"
              aria-label="Facebook"
            />
            <v-btn
              :href="content.config.youtube"
              target="_blank"
              rel="noopener"
              icon="mdi-youtube"
              variant="text"
              size="small"
              aria-label="YouTube"
            />
          </div>
        </v-col>

        <v-col cols="12" md="3">
          <p class="text-caption text-uppercase font-weight-bold mb-4">Instagram</p>
          <InstagramFeed />
        </v-col>
      </v-row>

      <v-divider class="my-6" />
      <div class="d-flex flex-column flex-sm-row align-center justify-space-between ga-2">
        <p class="text-caption text-medium-emphasis">
          © {{ new Date().getFullYear() }} Academia Spartan. Todos os direitos reservados.
        </p>
        <RouterLink to="/login" class="text-caption text-medium-emphasis text-decoration-none">
          Área administrativa
        </RouterLink>
      </div>
    </div>
  </v-footer>
</template>

<style scoped>
.footer-logo {
  height: 40px;
  width: auto;
}

.border-t {
  border-top: 1px solid #1a1f27;
}

.spartan-footer {
  padding: 0;
}
</style>
