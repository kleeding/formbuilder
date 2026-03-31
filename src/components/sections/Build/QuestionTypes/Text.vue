<template>
    <input type="text" v-model="formModel[details['model-name']]" :name="details['model-name']" :placeholder="getPlaceholder" />
    <div v-for="error in validationErrors" class="validation-errors">
        <span>{{ error }}</span>
    </div>
</template>

<script setup>
import { ref, toRefs, inject, computed, watch } from 'vue'
import { validate } from '@/components/javascript/validate';

const { formModel, updateformModel } = inject('model');
const validationErrors = ref([]);

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
    validate: {
        type: Boolean,
        default: false,
        required: false
    }
})

const validateRef = toRefs(props).validate;

watch(validateRef, (newValue) => {
    if(!newValue || !props.details.hasOwnProperty('validation')) {
        validationErrors.value = [];
        return;
    } // validation turned off or question has no validation rules -> empty validation result

    var modelName = props.details['model-name'];
    if(formModel.value.hasOwnProperty(modelName)){
        var input = formModel.value[modelName];
        validationErrors.value = validate(input, props.details.validation);
    }
})

const getPlaceholder = computed(() => {
    if (props.details.hasOwnProperty('placeholder')) return props.details.placeholder;
    return ""
})
</script>

<style scoped>

</style>