<template>
    <div class="toolbox-element toolbox-element-section">
        <div class="toolbox-element-info">
            <span class="toolbox-element-title">Section Title</span>
            <input v-if="editEnabled" type="text" class="toolbox-input" v-model="currentSection.title" name="title" placeholder="Enter a section title" />
            <span v-else class="toolbox-label">{{ currentSection.title }}</span>
        </div>
        <div class="toolbox-side-controls">
            <button @click="toggleEdit">edit</button>
            <button @click="toggleExpand()">exp.</button>
        </div>
    </div>

    <div :class="['toolbox-questions', { ['collapsed']: !expand }]"> <!-- MAKE THIS COLLAPSIBLE -->
        <NewQuestion />
        <Question v-for="(question, index) in currentSection.questions" :position="[...position, index]"/>
    </div>

    <NewSection />
</template>

<script setup>
import { ref, watch, inject } from 'vue';
import NewQuestion from './NewQuestion.vue';
import NewSection from './NewSection.vue';
import Question from './Question.vue';

const editEnabled = ref(false);
const expand = ref(true); // default should be false

const { toolboxForm, updateForm } = inject('data');

const props = defineProps({
    position: {
        type: Object,
        required: true
    }
})

const currentSection = ref(setupSection());

function setupSection() {
    var baseSection = JSON.parse(JSON.stringify(toolboxForm.value.sections[props.position[0]]));

    if(!baseSection.title) baseSection.title = "";
    if(!baseSection.questions) baseSection.questions = "";

    return baseSection;
}

watch(editEnabled, (enabled) => {
    if(enabled) return;
    var baseForm =  JSON.parse(JSON.stringify(toolboxForm.value));
    baseForm.sections[props.position[0]].title = currentSection.value.title;
    updateForm(baseForm);
})

function toggleEdit() {
    editEnabled.value = !editEnabled.value;
}

function toggleExpand() {
    expand.value = !expand.value;
}
</script>

<style scoped>
.toolbox-element-section {
  background-color: rgba(0, 255, 42, 0.096);
}
</style>