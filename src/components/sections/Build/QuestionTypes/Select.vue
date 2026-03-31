<template>
    <select v-model="formModel[details['model-name']]" :name="details['model-name']" >
        <option v-for="option in options" :value="option.value">
            {{ option.label }}
        </option>
    </select>
</template>

<script setup>
import { inject } from 'vue'

const { formModel, updateformModel } = inject('model');

const props = defineProps({
    details: {
        type: Object,
        required: true
    },
    options: {
        type: Object,
        default: [],
        required: false
    },
    validate: {
        type: Boolean,
        default: false,
        required: false
    }
})
</script>

<style scoped>

</style>