<script setup>
    import { defineProps } from 'vue'
    const props = defineProps({
        transactions: {
            type: Array,
            required: true
        }
    })

    const emit = defineEmits(['transactionDeleted'])

    const deleteTransaction = (id) => {
        emit('transactionDeleted', id)
    }
</script>


<template>
    <h3>Historique</h3>
    <ul id="list" class="list">
        <li v-for="transaction in props.transactions" :key="transaction.id" :class="transaction.amount < 0 ? 'minus':'plus'">
            {{ transaction.text }} <span>{{ (transaction.amount.toFixed(2)+"").replace(/\./g, ",") }} €</span>
            <button class="delete-btn" @click="deleteTransaction(transaction.id)">
                <span class="delete-text">x</span>
            </button>
        </li>
        <!-- <li class="minus">
            Espèces <span>-400€</span>
            <button class="delete-btn">x</button>
        </li>
        <li class="plus">
            Chèque <span>800€</span>
            <button class="delete-btn">x</button>
        </li> -->
    </ul>
</template>