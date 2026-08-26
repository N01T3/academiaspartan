<script setup lang="ts">
import { useContentStore } from '@/store/content'
import { useFinanceStore } from '@/store/finance'
import KpiCard from '@/components/ui/KpiCard.vue'
import { formatCurrency } from '@/utils/format'

const content = useContentStore()
const finance = useFinanceStore()

const kpis = [
  { label: 'Posts publicados', value: content.posts.filter((p) => p.published).length },
  { label: 'Membros da equipe', value: content.team.length },
  { label: 'Programas', value: content.programs.length },
  { label: 'Mensagens não lidas', value: content.messages.filter((m) => !m.read).length },
]

const financeKpis = [
  { label: 'Receita total', value: formatCurrency(finance.totalIncome), accent: true },
  { label: 'Despesas', value: formatCurrency(finance.totalExpense) },
  { label: 'Saldo', value: formatCurrency(finance.balance) },
  { label: 'Alunos ativos', value: finance.activeStudents },
]
</script>

<template>
  <div>
    <h1 class="text-h5">Dashboard</h1>
    <p class="text-body-2 text-medium-emphasis mt-1">Visão geral da Academia Spartan.</p>

    <v-row class="mt-4">
      <v-col v-for="kpi in kpis" :key="kpi.label" cols="12" sm="6" lg="3">
        <KpiCard :label="kpi.label" :value="kpi.value" />
      </v-col>
    </v-row>

    <v-row class="mt-2">
      <v-col v-for="kpi in financeKpis" :key="kpi.label" cols="12" sm="6" lg="3">
        <KpiCard :label="kpi.label" :value="kpi.value" :accent="kpi.accent" />
      </v-col>
    </v-row>
  </div>
</template>
