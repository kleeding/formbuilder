<template>
    <div class="new-section" @click="addOption()">
        <span class="new-element-text">New Option</span>
    </div>
</template>

<script setup>
import { inject } from 'vue';

const { toolboxForm, updateForm } = inject('data');

function addOption() {
    var newOptionName = crypto.randomUUID();
    var baseForm = JSON.parse(JSON.stringify(toolboxForm.value));
    baseForm.options[newOptionName] = [];
    updateForm(baseForm);
}
</script>