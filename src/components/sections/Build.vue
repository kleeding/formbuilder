<template>
    <section class="build-view">
        <form @submit.prevent>

        <div v-if="hasTitle" class="form-title">{{ formData.title }}</div>

        <div v-for="(field, index) in formData">
            <div v-if="isPrefixed(index, 'sections')" v-for="section in field" :key="section.id" class="form-section">
                <div class="section-title">{{section.title}}</div>
                <QuestionSet :questions="section.questions"/>
            </div>

            <div v-else-if="isPrefixed(index, 'questions')" class="form-section">
                <QuestionSet :questions="field"/>
            </div>
        </div>

        <div class="submit-row">
            <button type="submit" @click="console.log('TIME TO VALIDATE')" class="submit-btn">Submit Form</button>
        </div>
      </form>
    </section>
</template>

<script setup>
import { ref, toRefs, provide, computed, watch } from 'vue'
import QuestionSet from './Build/QuestionSet.vue'

const currentFormModel = ref({});

provide('formModel', currentFormModel);

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

function isPrefixed(str, prefix) {
    return str.startsWith(prefix);
}

const hasTitle = computed(() => {
    return props.formData.hasOwnProperty('title');
})

function createFormModel(){
    var model = {};
    const stack = [props.formData];
    while (stack?.length > 0) {
        const currentObj = stack.pop();
        Object.keys(currentObj).forEach(key => {
            if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
                if (key.startsWith("questions")){
                    currentObj[key].forEach((question) => {
                        var defaultValue = question.default ?? (question.component === 'select' ? 0 : "");
                        model[question['model-name']] = defaultValue;
                    })
                }
                stack.push(currentObj[key]);
            }
        });
    }
    return model;
}
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
    background: var(--vt-c-mute);
    border: 1px solid var(--vt-c-soft);
    cursor: pointer;
    color: var(--color-text);
    font-size: 12px;
    font-weight: 600;
    padding: 10px 20px;
}

.submit-btn:hover {
    border: 1px solid var(--color-button-border);
    background: var(--color-button);
}
</style>