<template>
    <div class="toolbox-element">
        <div class="toolbox-element-info">
            <span class="toolbox-element-title">Form Title</span>
            <input v-if="editEnabled" type="text" class="toolbox-input" v-model="currentForm.title" name="formTitle" placeholder="Enter a form title" />
            <span v-else class="toolbox-label">{{ currentForm.title }}</span>
        </div>
        <div class="toolbox-side-controls">
            <div style="width: 36px; height: 36px;">
                <div v-if="editEnabled" @click="toggleEdit"><img src="@/components/icons/save.svg"></div>
                <div v-else @click="toggleEdit"><img src="@/components/icons/edit.svg"></div>
            </div>
            <div v-if="expand" @click="toggleExpand()"><img src="@/components/icons/collapse.svg"></div>
            <div v-else @click="toggleExpand()"><img src="@/components/icons/expand.svg"></div>
        </div>
    </div>

    <div :class="['toolbox-sections', { ['collapsed']: !expand }]">
        <NewSection :position="0"/>

        <Section v-for="(section, index) in currentForm.sections" :key="section.id" :position="[index]"/>
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

    if(!baseForm.id) baseForm.id = crypto.randomUUID();
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

watch(toolboxForm, () => {
    currentForm.value = setupForm();
})

function toggleEdit() {
    editEnabled.value = !editEnabled.value;
}

function toggleExpand() {
    expand.value = !expand.value;
}
</script>