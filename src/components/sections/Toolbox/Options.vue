<template>
    <div class="toolbox-element">
        <div class="toolbox-element-info">
            <span class="toolbox-option-title">Options</span>
        </div>      
        <div class="toolbox-side-controls">
            <div v-if="expand" @click="toggleExpand()"><img src="@/components/icons/collapse.svg"></div>
            <div v-else @click="toggleExpand()"><img src="@/components/icons/expand.svg"></div>
        </div>
    </div>  

    <div :class="['toolbox-options', { ['collapsed']: !expand }]">
        <NewOption />
        <Option v-for="(option, index) in options" :key="index" :option-name="index"/>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Option from './Option.vue';
import NewOption from './NewOption.vue';

const expand = ref(false);

const props = defineProps({
    options: {
        type: Object,
        required: true
    }
})

function toggleExpand() {
    expand.value = !expand.value;
}
</script>

<style scoped>
.toolbox-option-title {
  font-weight: 200;
  margin: auto 0;
}
</style>