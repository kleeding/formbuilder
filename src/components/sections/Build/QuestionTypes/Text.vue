<template>
    <input type="text" :placeholder="getPlaceholder"/>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    details: {
        type: Object,
        required: true
    }
})

const getPlaceholder = computed(() => {
    if (props.details.hasOwnProperty('placeholder')) return props.details.placeholder;
    return ""
})
</script>

<style scoped>

</style>