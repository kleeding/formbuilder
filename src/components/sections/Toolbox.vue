<template>
    <div class="toolbox-view">
        <Form />
    </div>
</template>

<script setup>
import { ref, watch, provide } from 'vue';
import Form from './Toolbox/Form.vue';

const props = defineProps({
    formJson: {
        type: String,
        required: true
    },
    formData: {
        type: Object,
        required: true
    }
})

const toolboxForm = ref(JSON.parse(JSON.stringify(props.formData)));

const emits = defineEmits(['update:formJson'])

watch(toolboxForm, (newFormData) => {
    var newJson = getFormJson(newFormData)
    emits('update:formJson', newJson);
})

function getFormJson(newFormData) {
    try {
        return JSON.stringify(newFormData, null, 4);
    } catch (e) {
        return JSON.stringify(props.formData, null, 4);
    }
}

function updateForm(newForm) {
    toolboxForm.value = newForm;
}

provide('data', {toolboxForm, updateForm});
</script>

<style scoped>
</style>