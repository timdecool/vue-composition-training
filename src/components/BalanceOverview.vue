<script setup>

import { defineProps } from 'vue'
    
const props = defineProps({
    total: {
        type: String,
        required: true
    }    
})
</script>

<template>
    <h4>Équilibre global</h4>
    <h1 id="balance">{{ props.total }} €</h1>

</template>