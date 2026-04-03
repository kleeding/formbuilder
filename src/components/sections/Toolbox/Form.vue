<template>
    <div class="toolbox-element">
        <div class="toolbox-element-info">
            <span class="toolbox-element-title">Form Title</span>
            <input v-if="editEnabled" type="text" class="toolbox-input" v-model="currentForm.title" name="formTitle" placeholder="Enter a form title" />
            <span v-else class="toolbox-label">{{ currentForm.title }}</span>
        </div>
        <div class="toolbox-side-controls">
            <button @click="toggleEdit">edit</button>
            <button @click="toggleExpand()">exp.</button>
        </div>
    </div>

    <div :class="['toolbox-sections', { ['collapsed']: !expand }]">
        <NewSection />

        <Section v-for="(section, index) in currentForm.sections" :position="[index]"/>
    </div>
</template>

<script setup>
import { ref, watch, inject } from 'vue';
import NewSection from '../Toolbox/NewSection.vue';
import Section from '../Toolbox/Section.vue';

const editEnabled = ref(false);
const expand = ref(true);

const { toolboxForm, updateForm } = inject('data');

const currentForm = ref(setupForm());

function setupForm() {
    var baseForm = JSON.parse(JSON.stringify(toolboxForm.value));

    if(!baseForm.title) baseForm.title = "";
    if(!baseForm.sections) baseForm.sections = [];

    return baseForm;
}

watch(editEnabled, (enabled) => {
    if(enabled) return;
    var baseForm = JSON.parse(JSON.stringify(toolboxForm.value));
    baseForm.title = currentForm.value.title;
    updateForm(baseForm);
})

function toggleEdit() {
    editEnabled.value = !editEnabled.value;
}

function toggleExpand() {
    expand.value = !expand.value;
}
</script>