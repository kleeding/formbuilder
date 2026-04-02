<template>
    <textarea v-model="formModel[details['model-name']].value" :name="details['model-name']" :placeholder="getPlaceholder" />
    <div v-if="showErrors" v-for="error in formModel[modelName].validation" class="validation-errors">
        <span>{{ error }}</span>
    </div>
</template>

<script setup>
import { ref, toRefs, inject, computed, watch, onMounted } from 'vue'
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

const getPlaceholder = computed(() => {
    if (props.details.hasOwnProperty('placeholder')) return props.details.placeholder;
    return ""
})

var modelName = props.details['model-name'];
watch(formModel.value[modelName], (newValue) => {
    if(newValue.value == valueHistory.value) return;
    valueHistory.value = newValue.value;
    showErrors.value = false;
    formModel.value[modelName].validation = validate(formModel.value[modelName].value, props.details);
});

onMounted(() => {
    formModel.value[modelName].validation = validate(formModel.value[modelName].value, props.details);
})
</script>