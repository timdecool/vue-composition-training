<script setup>
  import HeaderView from './views/HeaderView.vue'
  import BalanceOverview from './components/BalanceOverview.vue'
  import IncomeExpense from './components/IncomeExpense.vue'
  import TransactionList from '@/components/TransactionList.vue'
  import AddTransaction from '@/components/AddTransaction.vue'

  import { useToast } from 'vue-toastification'

  import { ref, computed, onMounted } from 'vue'

  const toast = useToast();

  const transactions = ref([])

  onMounted(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions'));
    if(savedTransactions) {
      transactions.value = savedTransactions
    }
  })

  // Computed montants dépenses, revenus et total
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

  // Handler transaction
  const handleTransaction = (transactionData) => {
    transactions.value.push({
      id: generateUniqueId(),
      text: transactionData.text,
      amount: transactionData.amount
    })

    toast.success('Nouvelle transaction ajoutée !')
    saveTransactionsToLocalStorage()
  }

  const generateUniqueId = () => {
    return Math.floor(Math.random() * 1000000)
  }

  const handleDelete = (id) => {
    transactions.value = transactions.value.filter((transaction) => transaction.id !== id)
    toast.success('La transaction a bien été supprimée.')
    saveTransactionsToLocalStorage()
  }

  // Sauver les données en localstorage
  const saveTransactionsToLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions.value))
  }


</script>

<template>
  <header-view />
  <div class="container">
    <balance-overview :total="total"/>
    <income-expense :income="income" :expenses="expenses"/>
    <transaction-list :transactions="transactions" @transactionDeleted="handleDelete"/>
    <add-transaction @transactionSubmitted="handleTransaction"/>
    
  </div>
</template>