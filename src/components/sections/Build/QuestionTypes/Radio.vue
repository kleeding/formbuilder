<template>
    <div class="radio-container">
        <div class="radio-input-container" v-for="option in options" :name="details['model-name']" :key="option.value">       
            <input type="radio" class="radio-button" :id="details['model-name'] + '-' + option.value" :value="option.value" v-model="formModel[details['model-name']].value" />
            <span class="radio-label" @click="clickRadio(option.value)">{{ option.label }}</span>
        </div>
    </div>
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

function clickRadio(value) {
    var id = props.details['model-name'] + '-' + value;
    document.getElementById(id).click();
}

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