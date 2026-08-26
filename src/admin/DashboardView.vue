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
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-white">Dashboard</h1>
    <p class="mt-1 text-sm text-zinc-400">Visão geral da Academia Spartan.</p>

    <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard v-for="kpi in kpis" :key="kpi.label" :label="kpi.label" :value="kpi.value" />
    </div>

    <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard label="Receita total" :value="formatCurrency(finance.totalIncome)" accent />
      <KpiCard label="Despesas" :value="formatCurrency(finance.totalExpense)" />
      <KpiCard label="Saldo" :value="formatCurrency(finance.balance)" />
      <KpiCard label="Alunos ativos" :value="finance.activeStudents" />
    </div>
  </div>
</template>
