<template>
    <section class="build-view">
        <form @submit.prevent>
        <div v-if="hasTitle" class="form-title">{{ formData.title }}</div>

        <div v-if="hasSections" v-for="(section, index) in formData.sections" class="form-section">
            <div class="section-title">{{section.title}}</div>
            <QuestionSet v-if="hasQuestions(section)" :questions="section.questions" :options="formData.options" :validate="validate"/>
        </div>

        <div class="submit-row">
            <button type="submit" @click="toggleValidate()" class="submit-btn">{{"Submit Form"}}</button>
        </div>
      </form>
    </section>
</template>

<script setup>
import { ref, toRefs, computed, watch, onMounted } from 'vue'
import { getDefault } from '../javascript/getDefaults';
import QuestionSet from './Build/QuestionSet.vue'

const currentFormModel = ref({});
const validate = ref(false);

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
    getFormModel();
})

watch(currentFormModel, (newFormModel) => {
    emits('update:formModel', newFormModel);
})

function getFormModel() {
    var newModel = createFormModel();
    newModel = replaceValues(newModel);
    return currentFormModel.value = newModel;
}

function replaceValues(model){
    Object.keys(currentFormModel.value).forEach(key => {
        if(model.hasOwnProperty(key)) model[key] = currentFormModel.value[key];
    });
    return model;
}

const hasTitle = computed(() => {
    return props.formData.hasOwnProperty('title');
})

const hasSections = computed(() => {
    return props.formData.hasOwnProperty('sections');
});

function hasQuestions(section){
    return section.hasOwnProperty('questions');
}

function createFormModel(){
    if(Array.isArray(props.formData)){
        return searchStack([...props.formData]);
    }
    else {
        return searchStack([props.formData]);
    }
}

function searchStack(stack) {
    var model = {};
    while (stack?.length > 0) {
        var currentObj = stack.pop();
        if(currentObj.hasOwnProperty('model-name')){
            var defaultValue = getDefault(currentObj);
            model[currentObj['model-name']] = defaultValue;
        }
        Object.keys(currentObj).forEach(key => {
            if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
                stack.push(currentObj[key]);
            }
        });
    }
    model.valid = false;
    return model;
}

function toggleValidate() {
    validate.value = !validate.value;
}

onMounted(() => {
    getFormModel();
})
</script>

<style scoped>
.build-view {
    background-color: var(--color-border);
    width: 100%;
    flex-grow: 1;
    padding: 1em;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
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
}

.submit-btn {
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