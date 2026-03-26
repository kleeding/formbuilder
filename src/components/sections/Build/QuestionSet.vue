<template>
    <div v-for="question in questions" :key="question.id" class="form-question">
        <label class="question-label">
            {{ question.id + " " + question.label }}
            <div v-if="question.required === 'true'" class="required">*</div>
        </label>

        <component :is="getComponent(question)" :details="question"></component>
        
        <QuestionSet v-if="hasFurtherQuestions(question)" :questions="question.questions"/>
    </div>
</template>

<script setup>
import Text from './QuestionTypes/Text.vue';
import Select from './QuestionTypes/Select.vue';
import Unknown from './QuestionTypes/Unknown.vue';

const props = defineProps({
    questions: {
        type: Object,
        required: true
    }
})

function getComponent(question) {
    switch (question.component.toLowerCase()) {
        case 'text':
            return Text;
        case 'textarea':
            return 'TextArea';
        case 'select':
            return Select;
        case 'radio':
            return 'Radio';
        default:
            return Unknown;
    }
}

function hasFurtherQuestions(question) {
    return question.hasOwnProperty('questions');
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
    display: flex;
}

.required {
    color: var(--color-button-border);
}
</style>