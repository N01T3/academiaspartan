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

const txHeaders = [
  { title: 'Descrição', key: 'description' },
  { title: 'Categoria', key: 'category' },
  { title: 'Data', key: 'date' },
  { title: 'Valor', key: 'amount', align: 'end' },
  { title: 'Ações', key: 'actions', sortable: false, align: 'end' },
] as const

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
    <div class="mb-4">
      <h1 class="text-h5">Finanças</h1>
      <p class="text-body-2 text-medium-emphasis mt-1">
        Visão geral financeira e gestão de lançamentos e planos.
      </p>
    </div>

    <v-row>
      <v-col cols="12" sm="6" lg="3">
        <KpiCard label="Receita total" :value="formatCurrency(finance.totalIncome)" accent />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <KpiCard label="Despesas" :value="formatCurrency(finance.totalExpense)" />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <KpiCard label="Saldo" :value="formatCurrency(finance.balance)" />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <KpiCard label="Inadimplência" :value="`${finance.defaulters} alunos`" />
      </v-col>
    </v-row>

    <div class="d-flex align-center justify-space-between mt-8 mb-3">
      <h2 class="text-subtitle-1 font-weight-bold">Lançamentos</h2>
      <v-btn color="primary" prepend-icon="mdi-plus" @click="openTx">Novo lançamento</v-btn>
    </div>
    <v-card>
      <v-data-table :headers="txHeaders" :items="finance.transactions" :items-per-page="-1" hover>
        <template #item.date="{ item }">{{ formatDate(item.date) }}</template>
        <template #item.amount="{ item }">
          <span :class="item.type === 'income' ? 'text-success' : 'text-error'" class="font-weight-bold">
            {{ item.type === 'income' ? '+' : '-' }}{{ formatCurrency(item.amount) }}
          </span>
        </template>
        <template #item.actions="{ item }">
          <div class="d-flex justify-end ga-1">
            <v-btn size="small" variant="text" color="secondary" @click="openTxEdit(item)">Editar</v-btn>
            <v-btn size="small" variant="text" color="error" @click="removeTx(item)">Excluir</v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <div class="d-flex align-center justify-space-between mt-8 mb-3">
      <h2 class="text-subtitle-1 font-weight-bold">Planos & Mensalidades</h2>
      <v-btn color="primary" prepend-icon="mdi-plus" @click="openPlan">Novo plano</v-btn>
    </div>
    <v-row>
      <v-col v-for="p in finance.plans" :key="p.id" cols="12" sm="6" lg="3">
        <v-card>
          <v-card-text>
            <div class="d-flex align-center justify-space-between">
              <h3 class="text-subtitle-1 font-weight-bold">{{ p.name }}</h3>
              <span
                :class="p.active ? 'text-success' : 'text-medium-emphasis'"
                class="text-caption text-uppercase"
              >
                {{ p.active ? 'Ativo' : 'Inativo' }}
              </span>
            </div>
            <p class="display-3 mt-2 text-primary">{{ formatCurrency(p.price) }}</p>
            <p class="text-body-2 text-medium-emphasis">/ {{ p.period }}</p>
            <v-divider class="my-3" />
            <div class="d-flex justify-end ga-1">
              <v-btn size="small" variant="text" color="secondary" @click="openPlanEdit(p)">Editar</v-btn>
              <v-btn size="small" variant="text" color="error" @click="removePlan(p)">Excluir</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <BaseModal
      :open="txModal"
      :title="txEditingId ? 'Editar lançamento' : 'Novo lançamento'"
      @close="txModal = false"
    >
      <v-form @submit.prevent="saveTx">
        <v-text-field v-model="txForm.description" label="Descrição" />
        <v-text-field v-model="txForm.category" label="Categoria" />
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field v-model="txForm.date" label="Data" type="date" />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model.number="txForm.amount"
              label="Valor (R$)"
              type="number"
              step="0.01"
              min="0"
            />
          </v-col>
        </v-row>
        <v-select
          v-model="txForm.type"
          label="Tipo"
          :items="[
            { title: 'Receita', value: 'income' },
            { title: 'Despesa', value: 'expense' },
          ]"
        />
        <div class="d-flex justify-end ga-2">
          <v-btn variant="outlined" @click="txModal = false">Cancelar</v-btn>
          <v-btn type="submit" color="primary">Salvar</v-btn>
        </div>
      </v-form>
    </BaseModal>

    <BaseModal
      :open="planModal"
      :title="planEditingId ? 'Editar plano' : 'Novo plano'"
      @close="planModal = false"
    >
      <v-form @submit.prevent="savePlan">
        <v-text-field v-model="planForm.name" label="Nome" />
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model.number="planForm.price"
              label="Preço (R$)"
              type="number"
              step="0.01"
              min="0"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="planForm.period"
              label="Período"
              :items="[
                { title: 'Mensal', value: 'mensal' },
                { title: 'Trimestral', value: 'trimestral' },
                { title: 'Anual', value: 'anual' },
              ]"
            />
          </v-col>
        </v-row>
        <div class="d-flex align-center ga-3">
          <ToggleSwitch v-model="planForm.active" />
          <span class="text-body-2">Ativo</span>
        </div>
        <div class="d-flex justify-end ga-2 mt-2">
          <v-btn variant="outlined" @click="planModal = false">Cancelar</v-btn>
          <v-btn type="submit" color="primary">Salvar</v-btn>
        </div>
      </v-form>
    </BaseModal>
  </div>
</template>
