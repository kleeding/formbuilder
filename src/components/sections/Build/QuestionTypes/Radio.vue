<template>
    <div class="radio-container">
        <label class="radio-input-container" v-for="option in getOptions" :key="option.value">       
            <input type="radio" class="radio-button" :value="option.value" v-model="formModel[details['model-name']]" />
            <label class="radio-label" for="one">{{ option.label }}</label>
        </label>
    </div>
</template>

<script setup>
import { ref, inject, computed } from 'vue'

const formModel = inject('formModel');

const value = ref('');

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
.radio-container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5em;
}

.radio-button {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    vertical-align: top;
    margin: calc(0.75em - 11px) 0.25rem 0 0;
    border: 2px solid var(--color-background-chill);
    border-radius: 50%;
    background: var(--color-background-chill) no-repeat center center;
    margin-right: 5px;
    vertical-align: middle;
}

.radio-button:where(:active, :hover) {
    border-color: var(--color-button-border);
    outline: none;
}

.radio-button:checked {
    background-color: var(--color-button-border);
}

.radio-label {
    vertical-align: middle;
}
</style>