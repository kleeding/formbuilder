<template>
    <div class="checkbox-container">
        <div class="checkbox-option-container" v-for="option in options" :name="details['model-name'] + '-' + option.value" :key="option.value">
            <div class="checkbox-input-container">
                <input type="checkbox" class="checkbox-box" :id="details['model-name'] + '-' + option.value" :value="option.value" v-model="formModel[details['model-name']]" />
            </div>
            <label class="checkbox-label" :for="details['model-name'] + '-' + option.value">{{ option.label }}</label>
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
</script>

<style scoped>
.checkbox-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
}

.checkbox-option-container {
    width: 100%;
    display: flex;
}

.checkbox-input-container {
    width: 50%;
    display: flex;
    justify-content: flex-end;
}

.checkbox-box {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    border: 2px solid var(--color-background-chill);
    margin: auto 5px;
    vertical-align: middle;
}

.checkbox-box:where(:active, :hover) {
    border-color: var(--color-button-border);
    outline: none;
}

.checkbox-box:checked {
    background-color: var(--color-button-border);
}

.checkbox-label {
    cursor: default;
    margin: auto 0;
}
</style>