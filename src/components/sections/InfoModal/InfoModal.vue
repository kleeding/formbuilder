<template>
  <div :class="[ 'modal', { 'hide': !showInfoModal }]">
    <span class="info-title">INFO</span>
    <span class="info-paragraph">
      This form builder demonstrates how JSON-driven design can be used to dynamically build forms using the JSON schema described below.
    </span>

    <FormBase />

    <SectionBase/>

    <QuestionBase />

    <ValidationBase />

    <OptionBase />
  </div>
</template>

<script setup>
import FormBase from './FormBase.vue';
import QuestionBase from './QuestionBase.vue';
import SectionBase from './SectionBase.vue';
import OptionBase from './OptionBase.vue';
import ValidationBase from './ValidationBase.vue';

const props = defineProps({
    showInfoModal: {
        type: Boolean,
        required: true
    }
})
</script>

<style scoped>
.modal {
  position: absolute;
  top: 188px;
  background-color: var(--color-background-chill);
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  border: 5px solid var(--color-border);
  box-shadow: 8px 8px 15px 3px var(--vt-c-indigo);
  padding: 0 1.5em 1em 1.5em;
  z-index: 10;
}

.hide {
  display: none;
}

table {
    width: 100%;
    color: var(--color-background)
}

th {
    font-weight: 800;
}

th, td {
    background-color: var(--vt-c-text-2);
    /* width: 50%; */
    text-align: center;
    padding: 0 1em;
    text-wrap: wrap;
}
</style>