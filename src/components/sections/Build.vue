<template>
    <section v-if="!submit" class="build-view">
        <div v-if="hasTitle" class="form-title">{{ formData.title }}</div>
        <form @submit.prevent>
            <div v-if="hasSections" v-for="(section, index) in formData.sections" class="form-section">
                <div class="section-title">{{section.title}}</div>
                <QuestionSet v-if="hasQuestions(section)" :questions="section.questions" :options="formData.options" :enableErrors="enableErrors"/>
            </div>

            <div class="submit-row">
                <button v-if="enableErrors > 0" type="button" @click="resetValidation()" class="submit-btn">{{"Reset Validation"}}</button>
                <button type="button" @click="submitForm()" class="submit-btn">{{"Submit Form"}}</button>
            </div>
        </form>
    </section>

    <section v-if="submit" class="model-view">
        <!-- CHANGE THIS SO THAT IT USES A TABLE  -->
        <div class="model-container">
            <div class="model-name-container">
                <span>Field Name</span>
                <div v-for="(value, index) in formattedFormModel()">
                    {{ index }}
                </div>
            </div>
            <div class="model-value-container">
                <span>Value</span>
                <div v-for="(value) in formattedFormModel()">
                    {{ value == "" ? "-" : value }}
                </div>
            </div>
        </div>
        <div class="submit-row">
            <button type="button" @click="returnToForm()" class="submit-btn">{{"<< Return"}}</button>
        </div>
    </section>
</template>

<script setup>
import { ref, toRefs, computed, watch } from 'vue'
import { createModel } from '../javascript/model';
import QuestionSet from './Build/QuestionSet.vue'

const currentFormModel = ref({});
const enableErrors = ref(0);
const submit = ref(false);

const props = defineProps({
    formModel: {
        type: Object,
        required: true
    },
    formData: {
        type: Object,
        required: true
    }
})

const formDataRef = toRefs(props).formData;

const emits = defineEmits(['update:formModel'])

watch(formDataRef, () => {
    currentFormModel.value = createModel(props.formData, currentFormModel.value);
})

watch(currentFormModel, (newFormModel) => {
    emits('update:formModel', newFormModel);
})

const hasTitle = computed(() => {
    return props.formData.hasOwnProperty('title');
})

const hasSections = computed(() => {
    return props.formData.hasOwnProperty('sections');
});

function formattedFormModel() {
    // Could build this up from formData and then use options object to transform values to outputs
    var sortedKeys = Object.keys(props.formModel).sort();
    var model = {};
    sortedKeys.forEach((key) => {
        model[key] = props.formModel[key].value;
    });
    return model;
}

function hasQuestions(section){
    return section.hasOwnProperty('questions');
}

function resetValidation() {
    enableErrors.value = 0;
}

function submitForm() {
    var anyErrors = Object.keys(props.formModel)
        .filter( key => props.formModel[key].validation != "" )
        .length > 0;
    if(anyErrors) {
        enableErrors.value++;
        return;
    }

    submit.value = true;
}

function returnToForm() {
    submit.value = !submit.value;
}
</script>

<style scoped>
.build-view, .model-view {
    background-color: var(--color-border);
    width: 100%;
    flex-grow: 1;
    padding: 1em;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
}

.model-view {
    justify-content: center;
    gap: 1em;
}

.model-container {
    display: flex;
    flex-grow: 1;
    gap: 1em;
    justify-content: center;
    align-items: center;
}

.model-name-container, .model-value-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap:1em
}

.form-title {
    justify-self: center;
    max-width: 100%;
    font-size: 1.75rem;
    font-weight: 700;
    overflow-wrap: break-word;
}

.form-section {
    background-color: var(--vt-c-mute);
    display: flex;
    flex-direction: column;
    margin: 1em 0 1em 0;
    padding: 1em;
    border-radius: 20px;
}

.section-separator {
    margin: 1em 0;
}

.section-title {
    max-width: 100%;
    font-size: 1.25rem;
    overflow-wrap: break-word;
}

.submit-row {
    display: flex;
    justify-content: center;
    gap: 0.5em;
}

.submit-btn {
    width: 100px;
    background-color: var(--vt-c-mute);
    border: 1px solid var(--vt-c-soft);
    cursor: pointer;
    color: var(--color-text);
    font-size: 12px;
    font-weight: 600;
    padding: 10px 20px;
    transition: 1s;
}

.submit-btn:active {
    border: 1px solid var(--color-button-border);
    background-color: var(--color-button);
    transition: 50ms;
}
</style>