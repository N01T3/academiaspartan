import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { transactions as seedTx, plans as seedPlans } from '@/data/finance'
import { loadStorage, saveStorage } from '@/utils/storage'
import { uid } from '@/utils/format'
import { isPlans, isTransactions } from '@/utils/validators'
import type { Plan, Transaction } from '@/types'

const TX_KEY = 'spartan.transactions'
const PLAN_KEY = 'spartan.plans'

export const useFinanceStore = defineStore('finance', () => {
  const transactions = ref<Transaction[]>(loadStorage(TX_KEY, seedTx, isTransactions))
  const plans = ref<Plan[]>(loadStorage(PLAN_KEY, seedPlans, isPlans))

  function persistTx() {
    saveStorage(TX_KEY, transactions.value)
  }
  function persistPlans() {
    saveStorage(PLAN_KEY, plans.value)
  }

  const totalIncome = computed(() =>
    transactions.value.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0),
  )
  const totalExpense = computed(() =>
    transactions.value.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
  )
  const balance = computed(() => totalIncome.value - totalExpense.value)

  const activeStudents = computed(() => 240)
  const defaulters = computed(() => 18)

  function addTransaction(data: Omit<Transaction, 'id'>) {
    transactions.value.unshift({ ...data, id: uid() })
    persistTx()
  }
  function updateTransaction(id: string, data: Partial<Transaction>) {
    const idx = transactions.value.findIndex((t) => t.id === id)
    if (idx !== -1) {
      transactions.value[idx] = { ...transactions.value[idx], ...data }
      persistTx()
    }
  }
  function removeTransaction(id: string) {
    transactions.value = transactions.value.filter((t) => t.id !== id)
    persistTx()
  }

  function addPlan(data: Omit<Plan, 'id'>) {
    plans.value.push({ ...data, id: uid() })
    persistPlans()
  }
  function updatePlan(id: string, data: Partial<Plan>) {
    const idx = plans.value.findIndex((p) => p.id === id)
    if (idx !== -1) {
      plans.value[idx] = { ...plans.value[idx], ...data }
      persistPlans()
    }
  }
  function removePlan(id: string) {
    plans.value = plans.value.filter((p) => p.id !== id)
    persistPlans()
  }

  return {
    transactions,
    plans,
    totalIncome,
    totalExpense,
    balance,
    activeStudents,
    defaulters,
    addTransaction,
    updateTransaction,
    removeTransaction,
    addPlan,
    updatePlan,
    removePlan,
  }
})
