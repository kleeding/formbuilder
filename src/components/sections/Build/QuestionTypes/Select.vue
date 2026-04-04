<template>
    <select v-model="formModel[details['model-name']].value" :name="details['model-name']" >
        <option v-for="option in options" :value="option.value">
            {{ option.label }}
        </option>
    </select>
    <div v-if="showErrors" v-for="error in formModel[props.details['model-name']].validation" class="validation-errors">
        <span>{{ error }}</span>
    </div>
</template>

<script setup>
import { ref, toRefs, inject, watch, onMounted } from 'vue'
import { validate } from '@/components/javascript/validate';

const { formModel, updateformModel } = inject('model');
const valueHistory = ref("");
const showErrors = ref(false);

const props = defineProps({
    details: {
        type: Object,
        required: true
    },
    options: {
        type: Object,
        default: [],
        required: false
    },
    enableErrors: {
        type: Number,
        default: false,
        required: false
    }
})

const enableErrorsRef = toRefs(props).enableErrors;
watch(enableErrorsRef, (newValue) => {
    if(newValue > 0 && formModel.value[props.details['model-name']].validation != "") {
        showErrors.value = true
    }
    else {
        showErrors.value = false;
    }
})

const detailsRef = toRefs(props).details;
watch(detailsRef, () => {
    try {
        showErrors.value = false;
        formModel.value[props.details['model-name']].validation = validate(formModel.value[props.details['model-name']].value, props.details);
    }
    catch{
        console.log("issue revalidating when updating question");
    }
});

watch(formModel.value[props.details['model-name']], (newValue) => {
    if(newValue.value == valueHistory.value) return;
    valueHistory.value = newValue.value;
    showErrors.value = false;
    formModel.value[props.details['model-name']].validation = validate(formModel.value[props.details['model-name']].value, props.details);
});

onMounted(() => {
    formModel.value[props.details['model-name']].validation = validate(formModel.value[props.details['model-name']].value, props.details);
})
</script>

<style scoped>

</style>