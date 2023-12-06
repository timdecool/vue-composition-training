<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const text = ref('');
const amount = ref('');

const toast = useToast();

const emit = defineEmits(['transactionSubmitted'])
const addTransaction = () => {
    if(!text.value || !amount.value) {
        toast.error('Les deux champs doivent être remplis pour ajouter une transaction !')
        return;        
    }

    const transactionData = {
        text: text.value,
        amount: parseFloat(amount.value.replace(/,/g,"."))
    }

    emit('transactionSubmitted', transactionData)
    text.value = ''
    amount.value = ''
}

</script>

<template>
    <h3>Nouvelle transaction</h3>
    <form id="form" @submit.prevent="addTransaction">
        <div class="form-control">
            <label for="text">Libellé</label>
            <input type="text" id="text" placeholder="Entrez votre libellé" v-model="text">
        </div>
        <div class="form-control">
            <label for="amount">Montant (- pour les dépenses)</label>
            <input type="text" id="amount" placeholder="Entrez le montant" v-model="amount">
        </div>
        <button class="btn">
            Ajouter la transaction
        </button>
    </form>
</template>