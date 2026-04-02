<template>
    <input 
        type="date"
        v-model="formModel[details['model-name']].value"
        :name="details['model-name']"
        :min="getMinDate"
        :max="getMaxDate"
    />
</template>

<script setup>
import { inject, computed } from 'vue'

const { formModel, updateformModel } = inject('model');

const props = defineProps({
    details: {
        type: Object,
        required: true
    },
    enableErrors: {
        type: Number,
        default: false,
        required: false
    }
})

const getMinDate = computed(() => {
    var daysAgo = 30;
    var now = Date.now();
    if(props.details.min){
        var min = parseFloat(props.details.min);
        if(!isNaN(min)) {
            daysAgo = min;
        }
    }
    return new Date(now - daysAgo * 86400000).toISOString().slice(0, 10);
})

const getMaxDate = computed(() => {
    var daysAhead = 30;
    var now = Date.now();
    if(props.details.max){
        var max = parseFloat(props.details.max);
        if(!isNaN(max)) {
            daysAhead = max;
        }
    }
    return new Date(now + daysAhead * 86400000).toISOString().slice(0, 10);
})
</script>

<style scoped>

</style>

