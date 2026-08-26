<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useFinanceStore } from '@/store/finance'
import KpiCard from '@/components/ui/KpiCard.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import ToggleSwitch from '@/components/ui/ToggleSwitch.vue'
import { formatCurrency, formatDate } from '@/utils/format'
import type { Plan, Transaction } from '@/types'

const finance = useFinanceStore()

const txModal = ref(false)
const txEditingId = ref<string | null>(null)
const txForm = reactive<Omit<Transaction, 'id'>>({
  description: '',
  category: '',
  amount: 0,
  type: 'income',
  date: new Date().toISOString().slice(0, 10),
})

const planModal = ref(false)
const planEditingId = ref<string | null>(null)
const planForm = reactive<Omit<Plan, 'id'>>({
  name: '',
  price: 0,
  period: 'mensal',
  active: true,
})

function openTx() {
  txEditingId.value = null
  Object.assign(txForm, {
    description: '',
    category: '',
    amount: 0,
    type: 'income',
    date: new Date().toISOString().slice(0, 10),
  })
  txModal.value = true
}

function openTxEdit(t: Transaction) {
  txEditingId.value = t.id
  Object.assign(txForm, t)
  txModal.value = true
}

function saveTx() {
  if (txEditingId.value) finance.updateTransaction(txEditingId.value, { ...txForm })
  else finance.addTransaction({ ...txForm })
  txModal.value = false
}

function removeTx(t: Transaction) {
  if (confirm(`Excluir o lançamento "${t.description}"?`)) finance.removeTransaction(t.id)
}

function openPlan() {
  planEditingId.value = null
  Object.assign(planForm, { name: '', price: 0, period: 'mensal', active: true })
  planModal.value = true
}

function openPlanEdit(p: Plan) {
  planEditingId.value = p.id
  Object.assign(planForm, p)
  planModal.value = true
}

function savePlan() {
  if (planEditingId.value) finance.updatePlan(planEditingId.value, { ...planForm })
  else finance.addPlan({ ...planForm })
  planModal.value = false
}

function removePlan(p: Plan) {
  if (confirm(`Excluir o plano "${p.name}"?`)) finance.removePlan(p.id)
}
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-white">Finanças</h1>
      <p class="mt-1 text-sm text-zinc-400">Visão geral financeira e gestão de lançamentos e planos.</p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard label="Receita total" :value="formatCurrency(finance.totalIncome)" accent />
      <KpiCard label="Despesas" :value="formatCurrency(finance.totalExpense)" />
      <KpiCard label="Saldo" :value="formatCurrency(finance.balance)" />
      <KpiCard label="Inadimplência" :value="`${finance.defaulters} alunos`" />
    </div>

    <div class="mt-10">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-lg font-bold text-white">Lançamentos</h2>
        <button type="button" class="btn-primary" @click="openTx">Novo lançamento</button>
      </div>
      <div class="card overflow-x-auto p-0">
        <table class="w-full text-left text-sm">
          <thead class="border-b border-ink-500 text-xs uppercase tracking-wider text-zinc-400">
            <tr>
              <th class="px-4 py-3">Descrição</th>
              <th class="px-4 py-3">Categoria</th>
              <th class="px-4 py-3">Data</th>
              <th class="px-4 py-3 text-right">Valor</th>
              <th class="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-ink-600">
            <tr v-for="t in finance.transactions" :key="t.id" class="hover:bg-ink-700/50">
              <td class="px-4 py-3 font-medium text-white">{{ t.description }}</td>
              <td class="px-4 py-3 text-zinc-300">{{ t.category }}</td>
              <td class="px-4 py-3 text-zinc-300">{{ formatDate(t.date) }}</td>
              <td
                class="px-4 py-3 text-right font-semibold"
                :class="t.type === 'income' ? 'text-green-400' : 'text-red-400'"
              >
                {{ t.type === 'income' ? '+' : '-' }}{{ formatCurrency(t.amount) }}
              </td>
              <td class="px-4 py-3 text-right">
                <button type="button" class="mr-2 text-accent hover:underline" @click="openTxEdit(t)">
                  Editar
                </button>
                <button type="button" class="text-red-400 hover:underline" @click="removeTx(t)">
                  Excluir
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="mt-10">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-lg font-bold text-white">Planos & Mensalidades</h2>
        <button type="button" class="btn-primary" @click="openPlan">Novo plano</button>
      </div>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="p in finance.plans" :key="p.id" class="card">
          <div class="flex items-center justify-between">
            <h3 class="font-bold text-white">{{ p.name }}</h3>
            <span :class="p.active ? 'text-green-400' : 'text-zinc-500'" class="text-xs uppercase">{{
              p.active ? 'Ativo' : 'Inativo'
            }}</span>
          </div>
          <p class="mt-2 font-display text-2xl font-bold text-primary">{{ formatCurrency(p.price) }}</p>
          <p class="text-sm text-zinc-400">/ {{ p.period }}</p>
          <div class="mt-4 flex justify-end gap-3 border-t border-ink-600 pt-3 text-sm">
            <button type="button" class="text-accent hover:underline" @click="openPlanEdit(p)">Editar</button>
            <button type="button" class="text-red-400 hover:underline" @click="removePlan(p)">Excluir</button>
          </div>
        </div>
      </div>
    </div>

    <BaseModal
      :open="txModal"
      :title="txEditingId ? 'Editar lançamento' : 'Novo lançamento'"
      @close="txModal = false"
    >
      <form class="space-y-4" @submit.prevent="saveTx">
        <div>
          <label class="label">Descrição</label>
          <input v-model="txForm.description" type="text" required class="input" />
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="label">Categoria</label>
            <input v-model="txForm.category" type="text" required class="input" />
          </div>
          <div>
            <label class="label">Data</label>
            <input v-model="txForm.date" type="date" required class="input" />
          </div>
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="label">Valor (R$)</label>
            <input v-model.number="txForm.amount" type="number" step="0.01" min="0" required class="input" />
          </div>
          <div>
            <label class="label">Tipo</label>
            <select v-model="txForm.type" class="input">
              <option value="income">Receita</option>
              <option value="expense">Despesa</option>
            </select>
          </div>
        </div>
        <div class="flex justify-end gap-3">
          <button type="button" class="btn-outline" @click="txModal = false">Cancelar</button>
          <button type="submit" class="btn-primary">Salvar</button>
        </div>
      </form>
    </BaseModal>

    <BaseModal
      :open="planModal"
      :title="planEditingId ? 'Editar plano' : 'Novo plano'"
      @close="planModal = false"
    >
      <form class="space-y-4" @submit.prevent="savePlan">
        <div>
          <label class="label">Nome</label>
          <input v-model="planForm.name" type="text" required class="input" />
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="label">Preço (R$)</label>
            <input v-model.number="planForm.price" type="number" step="0.01" min="0" required class="input" />
          </div>
          <div>
            <label class="label">Período</label>
            <select v-model="planForm.period" class="input">
              <option value="mensal">Mensal</option>
              <option value="trimestral">Trimestral</option>
              <option value="anual">Anual</option>
            </select>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <ToggleSwitch v-model="planForm.active" />
          <span class="text-sm text-zinc-300">Ativo</span>
        </div>
        <div class="flex justify-end gap-3">
          <button type="button" class="btn-outline" @click="planModal = false">Cancelar</button>
          <button type="submit" class="btn-primary">Salvar</button>
        </div>
      </form>
    </BaseModal>
  </div>
</template>
