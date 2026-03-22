<template>
    <nav class="controls">
      <button 
        :class="{ active: currentView === 'design' }" 
        @click="$emit('update:currentView', 'design')"
      >
        Design
      </button>
      <button 
        :class="{ active: currentView === 'build' }" 
        @click="$emit('update:currentView', 'build')"
        :disabled="buildDisabled"
      >
        Build
      </button>
      <button 
        :class="{ active: currentView === 'output' }" 
        @click="$emit('update:currentView', 'output')"
        :disabled="!hasResult"
      >
        Output
      </button>
    </nav>    
</template>

<script setup>
defineProps({
    currentView: {
        type: String,
        required: true
    },
    buildDisabled: {
        type: Boolean,
        required: true
    }
})

defineEmits(['update:currentView'])
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