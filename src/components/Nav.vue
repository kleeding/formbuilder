<template>
    <nav class="controls">
      <button 
        :class="{ active: isActive('design') }" 
        @click="$emit('update:activeViews', newActiveViews('design'))"
      >
        Design
      </button>
      <button 
        :class="{ active: isActive('build') }" 
        @click="$emit('update:activeViews', newActiveViews('build'))"
        :disabled="buildDisabled"
      >
        Build
      </button>
      <button 
        :class="{ active: isActive('output') }" 
        @click="$emit('update:activeViews', newActiveViews('output'))"
      >
        Output
      </button>
    </nav>    
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
    activeViews: {
        type: Object,
        required: true
    },
    buildDisabled: {
        type: Boolean,
        required: true
    }
})

const emptyViews = {
  'design': false,
  'build': false,
  'output': false
}
const currentActiveViews = ref(JSON.parse(JSON.stringify(props.activeViews)))

defineEmits(['update:activeViews'])

function newActiveViews(view){
  let cur = currentActiveViews.value;
  if(cur[view] && numberActive.value == 1){
    return cur; // cant disable the only view enabled
  }
  if(!cur[view] && (!isWide.value || (numberActive.value > 1 && isWide))){
    cur = { ...emptyViews };
    cur[view] = true;
    currentActiveViews.value = cur;
    return cur; // switch screens if not wide enough for multiple
  }
  cur[view] = !cur[view];
  currentActiveViews.value = cur;
  return cur;
}

function isActive(view) {
  return currentActiveViews.value[view] === true;
}

const numberActive = computed(() => {
  return isActive('design') + isActive('build') + isActive('output');
})

const width = ref(window.innerWidth)

function updateWidth() {
  // NEED TO DEBOUNCE THIS - NO NEED TO RUN SO MUCH
  width.value = window.innerWidth;
}

onMounted(() => {
window.addEventListener("resize", updateWidth);
})

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
})

const isWide = computed(() => {
  return width.value > 650;
})
</script>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 1rem;
}

button {
  padding: 10px 20px;
  cursor: pointer;
  border: 1px solid #ccc;
  background: white;
  min-width: 90px;
  text-align: center;
  font-family: lexend;
  font-weight: 600
}

button.active {
  background: #42b883;
  color: white;
  border-color: #42b883;
}
</style>