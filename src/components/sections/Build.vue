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
            <button type="submit" @click="console.log('clicked submit')" class="submit-btn">Submit Form</button>
        </div>
      </form>
    </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import QuestionSet from './Build/QuestionSet.vue'

const formModel = ref({});

const props = defineProps({
    formData: {
        type: Object,
        required: true
    },
    formResult: {
        type: Object,
        required: true
    }
})

const emits = defineEmits(['update:formResult'])

const hasTitle = computed(() => {
    return props.formData.hasOwnProperty('title');
})

function isPrefixed(str, prefix) {
    return str.startsWith(prefix);
}

function getFormResult() {
    return formModel.value;
}

watch(formModel, () => {
    emits('update:formResult', getFormResult());
})

// const formModel = ref(setupFormModel());
function initFormModel(){
    var model = {};
    const stack = [props.formData.value];
    while (stack?.length > 0) {
        const currentObj = stack.pop();
        Object.keys(currentObj).forEach(key => {
            if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
                if (key === 'questions'){
                    currentObj[key].forEach((question) => {
                        var defaultValue = question.default ?? (question.component === 'select' ? 0 : "");
                        model[question['model-name']] = defaultValue;
                    })
                }
                stack.push(currentObj[key]);
            }
        });
    }
    formModel.value = model;
}

// initFormModel();
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
    font-size: 1.75rem;
    font-weight: 700;
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
    font-size: 1.25rem;
}

.submit-btn {
    border: 1px solid var(--vt-c-soft);
    background: var(--vt-c-mute);
    color: var(--color-text);
    font-size: 12px;
}

.submit-btn:hover {
    border: 1px solid var(--color-button-border);
    background: var(--color-button);
}
</style>