<script setup lang="ts">
import { useErpStore } from '@/store/erp'
import ToggleSwitch from '@/components/ui/ToggleSwitch.vue'

const erp = useErpStore()
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-white">Integrações ERP</h1>
      <p class="mt-1 text-sm text-zinc-400">
        Gerencie os módulos e integrações com sistemas externos. As integrações reais serão ligadas na fase 2.
      </p>
    </div>

    <div class="grid gap-6 sm:grid-cols-2">
      <div v-for="mod in erp.modules" :key="mod.id" class="card">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h3 class="font-bold text-white">{{ mod.name }}</h3>
            <p class="mt-2 text-sm text-zinc-400">{{ mod.description }}</p>
          </div>
          <ToggleSwitch :model-value="mod.enabled" @update:model-value="(v) => erp.toggleModule(mod.id, v)" />
        </div>
        <div class="mt-4 border-t border-ink-600 pt-4">
          <label class="label">URL de integração (opcional)</label>
          <input
            :value="mod.integrationUrl"
            type="url"
            class="input"
            placeholder="https://api.seu-erp.com"
            @change="erp.setIntegrationUrl(mod.id, ($event.target as HTMLInputElement).value)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
