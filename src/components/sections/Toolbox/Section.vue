<template>
    <div class="toolbox-element toolbox-element-section">
        <div v-if="setDelete" class="toolbox-element-info">
            <div class="deletion-message">
                <div @click="deleteSection()"><img src="@/components/icons/check.svg"></div>
                CONFIRM DELETION
                <div @click="toggleDelete()"><img src="@/components/icons/cross.svg"></div>
            </div>
        </div>
        
        <div v-else class="toolbox-element-info">
            <span class="toolbox-element-title">Section Title</span>
            <input v-if="editEnabled" type="text" class="toolbox-input" v-model="currentSection.title" name="title" placeholder="Enter a section title" />
            <span v-else class="toolbox-label">{{ currentSection.title }}</span>
        </div>

        <div v-if="!setDelete" class="toolbox-side-controls">
            <div style="width: 36px; height: 36px;">
                <div v-if="editEnabled" @click="toggleEdit"><img src="@/components/icons/save.svg"></div>
                <div v-else @click="toggleEdit"><img src="@/components/icons/edit.svg"></div>
            </div>
            <div v-if="expand" @click="toggleExpand()"><img src="@/components/icons/collapse.svg"></div>
            <div v-else @click="toggleExpand()"><img src="@/components/icons/expand.svg"></div>
        </div>

        <div v-if="editEnabled && !setDelete" class="delete-button-container">
            <div class="delete-element-button" @click="toggleDelete()"><img src="@/components/icons/delete.svg"></div>
        </div>
    </div>

    <div :class="['toolbox-questions', { ['collapsed']: !expand }]"> <!-- MAKE THIS COLLAPSIBLE -->
        <NewQuestion :position="[...position, 0]"/>
        <Question v-for="(question, index) in currentSection.questions" :key="question.id" :position="[...position, index]"/>
    </div>

    <NewSection :position="position[0] + 1"/>
</template>

<script setup>
import { ref, watch, inject } from 'vue';
import NewQuestion from './NewQuestion.vue';
import NewSection from './NewSection.vue';
import Question from './Question.vue';

const editEnabled = ref(false);
const expand = ref(false);
const setDelete = ref(false);

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

    if(!baseSection.id) baseSection.id = crypto.randomUUID();
    if(!baseSection.title) baseSection.title = "";
    if(!baseSection.questions) baseSection.questions = "";

    return baseSection;
}

watch(toolboxForm, () => {
    currentSection.value = setupSection();
})

function toggleEdit() {
    editEnabled.value = !editEnabled.value;
    if(editEnabled.value) return;
    var baseForm =  JSON.parse(JSON.stringify(toolboxForm.value));
    baseForm.sections[props.position[0]].title = currentSection.value.title;
    updateForm(baseForm);
}

function toggleExpand() {
    expand.value = !expand.value;
}

function toggleDelete() {
    setDelete.value = !setDelete.value;
}

function deleteSection() {
    var baseForm =  JSON.parse(JSON.stringify(toolboxForm.value));
    baseForm.sections.splice([props.position[0]], 1)
    updateForm(baseForm);
}
</script>
