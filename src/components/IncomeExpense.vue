<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    income: {
        type: String,
        required: true
    },
    expenses: {
        type: String,
        required: true
    }
})
</script>

<template>
    <div class="inc-exp-container">
        <div>
            <h4>Revenus</h4>
            <p id="money-plus" class="money plus">+{{ props.income }}€</p>
        </div>
        <div>
            <h4>Dépenses</h4>
            <p id="money-minus" class="money minus">{{ props.expenses }}€</p>
        </div>
    </div>
</template>