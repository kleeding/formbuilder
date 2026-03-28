<template>
    <section v-if="isEnabled" class="build-view">
        <form @submit.prevent>

        <div v-if="hasTitle" class="form-title">{{ formData.title }}</div>

        <!-- 
        GOING TO CHANGE THIS SO THAT IT GOES THROUGH THE OBJECT ONE BY ONE 
        - IF SECTION THEN RUN SECTION COMPONENT
        - IF QUESTION THEN RUN QUESTION
        THIS WAY WE CAN HAVE LAYERED SECTIONS AND NON-SECTIONS
        - THIS MEANS WE CAN START WITH A NON-SECTION, END OF A NON-SECTION, 
          AND ANY OTHER COMBINATION OF NON-SECTION/SECTIONS
        -->

        <div v-for="section in formData.sections" :key="section.id" class="form-section">
            <div class="section-title">{{section.title}}</div>
            <QuestionSet :questions="section.questions"/>
        </div>

        <QuestionSet :questions="formData.questions"/>

        <div class="submit-row">
            <button type="submit" @click="console.log('clicked submit')" class="submit-btn">Submit Form</button>
        </div>
      </form>
    </section>
</template>

<script setup>
import { computed } from 'vue'
import QuestionSet from './Build/QuestionSet.vue'

const props = defineProps({
    formData: {
        type: Object,
        required: true
    },
    isEnabled: {
        type: Boolean,
        required: true
    }
})

const hasTitle = computed(() => {
    return props.formData.hasOwnProperty('title');
})
</script>

<style scoped>
.build-view {
    background-color: var(--color-border);
    flex-grow: 1;
    padding: 1em;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
}

.form-title {
    justify-self: center;
    font-size: 1.75rem;
    font-weight: 700;
}

.form-section {
    display: flex;
    flex-direction: column;
    margin: 2em 0 2em 0;
}

.section-title {
    font-size: 1.25rem;
}

.submit-btn {
    border: 1px solid var(--vt-c-soft);
    background: var(--vt-c-mute);
    color: var(--color-text);
    font-size: 12px;
    margin: 1em 0 0 0;
}

.submit-btn:hover {
    border: 1px solid var(--color-button-border);
    background: var(--color-button);
}
</style>