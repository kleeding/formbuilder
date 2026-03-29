<template>
    <textarea v-model="formModel[details['model-name']]" :name="details['model-name']" :placeholder="getPlaceholder" />
</template>

<script setup>
import { inject, computed } from 'vue'

const { formModel, updateFormModel } = inject('model');

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