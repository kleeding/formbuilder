<template>
    <div v-for="question in questions" :key="question.id" class="form-question">
        <div v-if="isEnabled(question)"> 
            <div class="question-label">
                {{ question.id + " " + question.label }}
                <div v-if="question.required === 'true'" class="required">*</div>
            </div>
            <component :is="getComponent(question)" :details="question" :options="getOptions(question)" :validate="validate"></component>

            <QuestionSet v-if="hasFurtherQuestions(question)" :questions="question.questions" :parent-value="parentValue(question)" :options="options" :validate="validate"/>
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
import Checkbox from './QuestionTypes/Checkbox.vue';
import Date from './QuestionTypes/Date.vue';
import Unknown from './QuestionTypes/Unknown.vue';

const { formModel, updateFormModel } = inject('model');

const props = defineProps({
    questions: {
        type: Object,
        required: true
    },
    options: {
        type: Object,
        default: [],
        required: false
    },
    parentValue: {
        type: String,
        required: false
    },
    validate: {
        type: Boolean,
        default: false,
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
        case 'checkbox':
            return Checkbox;
        case 'date':
            return Date;
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

function getOptions(question){
    if(!question.hasOwnProperty('options')) return [];
    return props.options[question.options] || [];
}

function isEnabled(question) {
    if(typeof props.parentValue === 'undefined') return true; // parent question has no value to compare against
    if(typeof question.dependency === 'undefined') return true; // child component does not depend on parent value
    var isEnabled = false;
    if(Array.isArray(question.dependency)) {
        isEnabled = question.dependency.includes(props.parentValue);
    }
    else {
        isEnabled = question.dependency === props.parentValue;
    }
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