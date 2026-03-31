<template>
    <div class="radio-container">
        <div class="radio-input-container" v-for="option in options" :name="details['model-name']" :key="option.value">       
            <input type="radio" class="radio-button" :id="details['model-name'] + '-' + option.value" :value="option.value" v-model="formModel[details['model-name']]" />
            <span class="radio-label" @click="clickRadio(option.value)">{{ option.label }}</span>
        </div>
    </div>
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

function clickRadio(value) {
    var id = props.details['model-name'] + '-' + value;
    document.getElementById(id).click();
}
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
    cursor: default;
    vertical-align: middle;
}
</style>