import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { useToast } from 'vue-toastification'
const toast = useToast()

export const useTransactionStore = defineStore('transaction', () => {
  // STATES
  const transactions = ref([
    {id:1,text:"Fleurs",amount:-19.99}
  ])

  // ACTIONS
  const handleTransaction = (transactionData) => {
    transactions.value.push({
      id: generateUniqueId(),
      text: transactionData.text,
      amount: transactionData.amount
    })

    toast.success('Nouvelle transaction ajoutée !')
    saveTransactionsToLocalStorage()
  }
  
  const handleDelete = (id) => {
    transactions.value = transactions.value.filter((transaction) => transaction.id !== id)
    toast.success('La transaction a bien été supprimée.')
    saveTransactionsToLocalStorage()
  }

  const generateUniqueId = () => {
    return Math.floor(Math.random() * 1000000)
  }

  const saveTransactionsToLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions.value))
  }

  // GETTERS
  const total = computed(() => {
    return (transactions.value.reduce((acc, transaction) => {
      return acc + transaction.amount
    }, 0)
    .toFixed(2)
    + "")
    .replace(/\./g, ",")
  })

  const income = computed(() => {
    return (transactions.value
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount
    }, 0)
    .toFixed(2) 
    + "")
    .replace(/\./g,",")
  })

  const expenses = computed(() => {
    return (transactions.value
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount
    }, 0)
    .toFixed(2) 
    + "")
    .replace(/\./g,",")
  })


  return { transactions, handleTransaction, handleDelete, total, income, expenses }
})
