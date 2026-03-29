<template>
    <select v-model="formModel[details['model-name']]" :name="details['model-name']" >
        <option v-for="option in getOptions" :value="option.value">
            {{ option.label }}
        </option>
    </select>
</template>

<script setup>
import { inject, computed } from 'vue'

const { formModel, updateformModel } = inject('model');

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