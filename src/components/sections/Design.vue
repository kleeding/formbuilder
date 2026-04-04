<template>
    <section class="design-view">
        <div v-if="isToolboxEnabled" class="toolbox-view">
            <Toolbox v-model:formJson="formJson" :formData="currentFormData"/>
        </div>
        <div v-else class="json-view">        
            <div id="design-title">
                <h3>Input your Form JSON</h3>
                <div class="json-buttons">
                    <button @click="clean">Clean</button>
                    <button @click="beautify">Beautify</button>
                </div>
            </div>
            <textarea
                id="json-input"
                class="json-input"
                v-model="formJson"
                placeholder='{ "id": 1, "question": "...", "component": "text" }'>
            </textarea>
            <p v-if="!isJsonValid" class="error">Invalid JSON syntax detected.</p>
        </div>
        <div class="toolbox-enabler">
            <label class="checkbox-label" for="toolbox-enabler">Enable Toolbox</label>
            <div class="checkbox-input-container">
                <input type="checkbox" class="checkbox-box" id="toolbox-enabler" value="1" v-model="isToolboxEnabled" />
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { example } from '../javascript/jsonInputs';
import Toolbox from './Toolbox.vue';

const formJson = ref(loadJson());

// Memory of the form data so if there is an error last non-error form builds
const currentFormData = ref({});
const isJsonValid = ref();
const isToolboxEnabled = ref(false);

const props = defineProps({
    formData: {
        type: Object,
        required: true
    }
})

const emits = defineEmits(['update:formData'])

watch(formJson, () => {
    getFormData();
})

watch(currentFormData, (newFormData) => {
    emits('update:formData', newFormData);
    localStorage.setItem('formJsonSave', formJson.value);
})

function loadJson() {
    var loadedJson = localStorage.getItem("formJsonSave");
    if(loadedJson !== null && loadedJson !== "") return loadedJson;
    localStorage.setItem("formJsonSave", example);
    return example;
}

function getFormData() {
    try {
        currentFormData.value = JSON.parse(formJson.value);
        isJsonValid.value = true;
    } catch (e) {
        isJsonValid.value = false;
    }
}

function beautify() {
    if(!isJsonValid.value) return;
    formJson.value = JSON.stringify(JSON.parse(formJson.value), null, 4);
}

function clean() {
    if(!isJsonValid.value) {
        // if json is invalid - return most recently valid json
        formJson.value = JSON.stringify(currentFormData.value, null, 4);
    };
    formJson.value = JSON.stringify(JSON.parse(formJson.value), null, 4);
}

getFormData();

onUnmounted(() => {
    localStorage.setItem("formJsonSave", formJson.value);
})
</script>

<style scoped>
.design-view {
    background-color: var(--color-border);
    width: 100%;
    flex-grow: 1;
    padding: 1em;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
}

.toolbox-enabler {
    display: flex;
    justify-content: flex-end;
}

.checkbox-input-container {
    width: 2em;
}

.checkbox-label {
  font-size: 0.75rem;
}

.json-view, .toolbox-view {
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

#design-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.json-buttons {
    display: flex;
    gap: 0.5em;
}

button {
    cursor: pointer;
    border: 1px solid var(--vt-c-soft);
    background: var(--vt-c-mute);
    color: var(--color-text);
    font-size: 12px;
}

button:hover {
    border: 1px solid var(--color-button-border);
    background: var(--color-button);
}

.error { 
    color: var(--color-button-border); /* NEED TO UPDATE COLOR VARIABLES SO THIS ISNT CALLING THE BUTTON COLOUR */
    font-size: 0.8rem; 
}
</style>