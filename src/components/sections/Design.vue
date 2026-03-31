<template>
    <!-- 
    IDEA: 
    - Add a tools section here for easy enter json elements
        - Add text/textarea/select/checkbox/radio
        - Add fields (string/array/object)
    - Just adds empty versions of these
    - Probably makes sense to be its own component
    -->
    <section class="design-view">
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
            placeholder='{ "id": 1, "question": "...", "component": "text" }'
        ></textarea>
        <p v-if="!isJsonValid" class="error">Invalid JSON syntax detected.</p>
    </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import { example, example2 } from '../javascript/jsonInputs';

const formJson = ref(example);
// Memory of the form data so if there is an error last non-error form builds
const currentFormData = ref({});
const isJsonValid = ref();

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
})

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

// const allowedKeys = new Set([
//     "id", "title", "sections", "questions", "model-name", "label", "component", "default", "placeholder", "options", "value", "required", "dependency"
// ]);

// function theReplacer(key, value) {
//     if (key === "") return value;
//     if (!isNaN(key)) return value;
//     if(allowedKeys.has(key)) return value;
//     if(typeof key !== 'undefined' && (key.startsWith("sections") || key.startsWith("questions"))) {
//         return value;
//     }
//     return undefined;
// }

getFormData();
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