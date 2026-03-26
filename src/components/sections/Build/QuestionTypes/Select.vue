<template>
    <select>
        <option v-for="option in getOptions" :value="option.value">
            {{ option.text }}
        </option>
    </select>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    details: {
        type: Object,
        required: true
    }
})

const getOptions = computed(() => {
    if (props.details.hasOwnProperty('options')) return props.details.options;
    return [];
})
</script>

<style scoped>

</style>