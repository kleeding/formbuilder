<template>
    <div class="new-question" @click="addQuestion()">
        <span class="new-element-text">{{ '↳'.repeat(position.length - 1) }}New Question</span>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue';

const newQuestion = ref({
    "id": crypto.randomUUID()
});

const { toolboxForm, updateForm } = inject('data');

const props = defineProps({
    position: {
        type: Object,
        required: true
    }
})

function addQuestion() {
    var baseForm = JSON.parse(JSON.stringify(toolboxForm.value));

    var positions = [...props.position];
    var parts = [baseForm.sections[positions.shift()]];

    while (positions.length > 1){
        parts.push(parts[parts.length - 1].questions[positions.shift()])
    }

    positions = [...props.position];
    var curPart = parts.pop();
    
    if(curPart.questions) {
        curPart.questions.splice(positions.pop(), 0, newQuestion.value);
    }
    else {
        curPart.questions = [newQuestion.value];
        positions.pop();
    }
    
    var newPart;
    while (positions.length > 1) {
        newPart = parts.pop()
        newPart.questions[positions.pop()] = curPart
        curPart = newPart
    }

    baseForm.sections[positions[0]] = curPart;

    updateForm(baseForm);
}
</script>