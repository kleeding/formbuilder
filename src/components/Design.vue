<template>
    <!-- 
    IDEA: 
    - Add a tools section here for easy enter json elements
        - Add text/textarea/select/checkbox/radio
        - Add fields (string/array/object)
    - Just adds empty versions of these
    - Probably makes sense to be its own component
    -->
    <section v-if="isEnabled" class="design-view">
        <div id="design-title">
            <h3>Input your Form JSON</h3>
            <button @click="beautify">Beautify</button>
        </div>
        <textarea
            id="json-input"
            v-model="json"
            placeholder='{ "id": 1, "question": "...", "component": "text" }'
        ></textarea>
        <p v-if="isFormInvalid" class="error">Invalid JSON syntax detected.</p>
    </section>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    jsonInput: {
        type: String,
        required: true
    },
    isEnabled: {
        type: Boolean,
        required: true
    },
    isFormInvalid: {
        type: Boolean,
        required: true
    }
})

const emits = defineEmits(['update:jsonInput'])

const json = ref(``)
json.value = props.jsonInput;

function beautify() {
    if(props.isFormInvalid) return;
    json.value = JSON.stringify(JSON.parse(json.value), null, 4);
}

watch(json, (newJson) => {
    emits('update:jsonInput', newJson);
})
</script>

<style scoped>
.design-view {
    background-color: var(--color-border);
    flex-grow: 1;
    max-width: 600px;
    min-width: 320px;
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

button {
    border: 1px solid var(--vt-c-soft);
    background: var(--vt-c-mute);
    color: var(--color-text);
    font-size: 12px;
}

button:hover {
    border: 1px solid var(--color-button-border);
    background: var(--color-button);
}

#json-input {
    background-color: var(--color-background-chill);
    color: var(--color-text);
}

.error { 
    color: var(--color-button-border); /* NEED TO UPDATE COLOR VARIABLES SO THIS ISNT CALLING THE BUTTON COLOUR */
    font-size: 0.8rem; 
}
</style>