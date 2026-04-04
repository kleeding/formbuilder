<template>
    <div class="new-section" @click="addSection()">
        <span class="new-element-text">New Section</span>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue';

const newSection = ref({
    "id": crypto.randomUUID(),
    "title": "new section",
    "questions": []
});

const { toolboxForm, updateForm } = inject('data');

const props = defineProps({
    position: {
        type: Number,
        required: true
    }
})

function addSection() {
    var baseForm = JSON.parse(JSON.stringify(toolboxForm.value));
    baseForm.sections.splice(props.position, 0, newSection.value);
    updateForm(baseForm);
}
</script>