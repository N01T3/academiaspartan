<script setup lang="ts">
import { useErpStore } from '@/store/erp'
import ToggleSwitch from '@/components/ui/ToggleSwitch.vue'

const erp = useErpStore()
</script>

<template>
  <div>
    <div class="mb-4">
      <h1 class="text-h5">Integrações ERP</h1>
      <p class="text-body-2 text-medium-emphasis mt-1">
        Gerencie os módulos e integrações com sistemas externos. As integrações reais serão ligadas na fase 2.
      </p>
    </div>

    <v-row>
      <v-col v-for="mod in erp.modules" :key="mod.id" cols="12" sm="6">
        <v-card class="pa-4">
          <div class="d-flex align-start justify-space-between ga-4">
            <div>
              <h3 class="text-subtitle-1 font-weight-bold">{{ mod.name }}</h3>
              <p class="text-body-2 text-medium-emphasis mt-1">{{ mod.description }}</p>
            </div>
            <ToggleSwitch
              :model-value="mod.enabled"
              @update:model-value="(v) => erp.toggleModule(mod.id, v)"
            />
          </div>
          <v-divider class="my-4" />
          <v-text-field
            :model-value="mod.integrationUrl"
            label="URL de integração (opcional)"
            placeholder="https://api.seu-erp.com"
            @update:model-value="(v) => erp.setIntegrationUrl(mod.id, v)"
          />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
