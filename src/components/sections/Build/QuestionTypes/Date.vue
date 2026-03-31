<template>
    <input type="date" v-model="formModel[details['model-name']]" :name="details['model-name']" />
</template>

<script setup>
import { inject, computed } from 'vue'

const { formModel, updateformModel } = inject('model');

const props = defineProps({
    details: {
        type: Object,
        required: true
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