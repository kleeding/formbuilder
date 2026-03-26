<template>
    <section v-if="isEnabled" class="design-view">
      <h3>Input your Form JSON</h3>
      <textarea
        id="json-input"
        v-model="json"
        placeholder='{ "id": 1, "question": "...", "component": "text" }'
      ></textarea>
      <p v-if="isFormInvalid" class="error">Invalid JSON syntax detected.</p>
    </section>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

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

watch(json, (newJson) => {
    emits('update:jsonInput', newJson);
})

onMounted(() => {
    document.getElementById('json-input').addEventListener("keydown", function (e) {checkKey(e)});
})

function checkKey(e) {
    console.log(e);
    if(e.key === 'Tab') pressedTab(e);
}

function pressedTab(e) {
    e.preventDefault();
    console.log(e);
    // Will deal with tab being pressed here
    // - Will make it so tab enters 2-4 spaces in text
}
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

#json-input {
    background-color: var(--color-background-chill);
    color: var(--color-text);
}

.error { 
    color: var(--color-button-border); /* NEED TO UPDATE COLOR VARIABLES SO THIS ISNT CALLING THE BUTTON COLOUR */
    font-size: 0.8rem; 
}
</style>