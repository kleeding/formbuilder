<template>
    <div v-for="question in questions" :key="question.id" class="form-question">
        <div v-if="isEnabled(question)"> 
            <div class="question-label">
                {{ question.id + " " + question.label }}
                <div v-if="question.required === 'true'" class="required">*</div>
            </div>
            <component :is="getComponent(question)" :details="question"></component>

            <QuestionSet v-if="hasFurtherQuestions(question)" :questions="question.questions" :parent-value="parentValue(question)"/>
        </div>
    </div>
</template>

<script setup>
import { inject } from 'vue';
import { getDefault } from '../../javascript/getDefaults';
import Text from './QuestionTypes/Text.vue';
import Textarea from './QuestionTypes/Textarea.vue';
import Select from './QuestionTypes/Select.vue';
import Radio from './QuestionTypes/Radio.vue';
import Unknown from './QuestionTypes/Unknown.vue';

const { formModel, updateFormModel } = inject('model');

const props = defineProps({
    questions: {
        type: Object,
        required: true
    },
    parentValue: {
        type: String,
        required: false
    }
})

function getComponent(question) {
    if(!question.hasOwnProperty('component')) return Unknown;
    switch (question.component.toLowerCase()) {
        case 'text':
            return Text;
        case 'textarea':
            return Textarea;
        case 'select':
            return Select;
        case 'radio':
            return Radio;
        default:
            return Unknown;
    }
}

function hasFurtherQuestions(question) {
    return question.hasOwnProperty('questions');
}

function parentValue(question) {
    return formModel.value[question['model-name']];
};

function isEnabled(question) {
    if(typeof props.parentValue === 'undefined') return true; // parent question has no value to compare against
    if(typeof question.dependency === 'undefined') return true; // child component does not depend on parent value
    var isEnabled = question.dependency === props.parentValue;
    // if child is not enabled - make sure it's model value is reset to default value
    if(!isEnabled) {
        var defaultValue = getDefault(question);
        updateFormModel(question['model-name'], defaultValue);
    }
    return isEnabled;
}
</script>

<style scoped>
.form-question {
    display: flex;
    flex-direction: column;
    font-size: 0.8rem;
    margin: 0.5em 0 0 0;
}

.question-label {
    max-width: 100%;
    display: flex;
    margin-bottom: 0.5rem;
    font-weight: bold;
    overflow-wrap: break-word;
}

.required {
    color: var(--color-button-border);
}
</style>