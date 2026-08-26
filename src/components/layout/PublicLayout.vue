<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import { useContentStore } from '@/store/content'

const content = useContentStore()
</script>

<template>
  <div>
    <SiteHeader />
    <v-main>
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </v-main>
    <SiteFooter />

    <v-btn
      :href="content.config.whatsapp"
      target="_blank"
      rel="noopener"
      icon="mdi-whatsapp"
      color="success"
      size="large"
      class="whatsapp-fab"
      aria-label="Fale pelo WhatsApp"
    />
  </div>
</template>

<style scoped>
.whatsapp-fab {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 30;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}
</style>
