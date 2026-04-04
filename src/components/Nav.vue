<template>
  <div>
    <nav class="controls">
      <button 
        :class="{ active: isDesign }" 
        @click="changeView('design')"
      >
        Design
      </button>
      <button 
        :class="{ active: isBuild }" 
        @click="changeView('build')"
        :disabled="buildDisabled"
      >
        Build
      </button>
    </nav>
    <div style="position: relative;">
      <div style="position: absolute; bottom: 0px; right: -40px;">
        <img src="@/components/icons/info.svg" @click="toggleInfo()">
      </div>
    </div>
  </div>

  <InfoModal :show-info-modal="showInfoModal"/>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import InfoModal from './sections/Design/InfoModal.vue';

const showInfoModal = ref(false);

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

const currentActiveViews = ref(JSON.parse(JSON.stringify(props.activeViews)))
const viewHistory = ref(initViewHistory());

function initViewHistory() {
  var viewHistory = [];
  if(currentActiveViews.value.design) viewHistory.push('design');
  if(currentActiveViews.value.build) viewHistory.push('build');
  return viewHistory;
}

const emits = defineEmits(['update:activeViews'])

function changeView(view) {
  var reloadBuild = false;
  if(maxViews.value === 1) {
    if(currentActiveViews.value[view]) return;
    if(view === 'design') {
      currentActiveViews.value['design'] = true;
      currentActiveViews.value['build'] = false;
      viewHistory.value = ['design'];
    }
    if(view === 'build') {
      currentActiveViews.value['design'] = false;
      currentActiveViews.value['build'] = true;
      viewHistory.value = ['build'];
    }
  }
  else {
    if(!currentActiveViews.value[view]) {
      currentActiveViews.value[view] = true;
      viewHistory.value.push(view);
      if(view === 'design') reloadBuild = true;
    }
    else {
      if(viewHistory.value.length === 2){
        currentActiveViews.value[view] = false;
        viewHistory.value = viewHistory.value.filter(element => element !== view);
      }
    }
  }

  emits('update:activeViews', currentActiveViews.value);
}

function toggleInfo() {
  showInfoModal.value = !showInfoModal.value;
}

/**
 *  OLD NAV METHOD - BUILD TO ALLOW FOR ANY NUMBER OF VIEWS
 *  ONLY USING TWO VIEWS NOW SO GOING TO SIMPLIFY


function changeView(view){
  if(currentActiveViews.value[view]) {
    tryToDisable(view);
  }
  else {
    tryToEnable(view);
  }

  function tryToEnable(view) {
    if(viewHistory.value.length >= maxViews.value) {
      disableLastEnabled();
    };
    enableView(view)
  }

  function tryToDisable(view) {
    if(viewHistory.value.length == 1) return;
    if(viewHistory.value.length > 1) {
      disableView(view);
    }
  }
  
  function enableView(view) {
    currentActiveViews.value[view] = true;
    viewHistory.value.push(view);
    emits('update:activeViews', currentActiveViews.value);
  }

  function disableView(view) {
    currentActiveViews.value[view] = false;
    viewHistory.value = viewHistory.value.filter(element => element !== view);
    emits('update:activeViews', currentActiveViews.value);
  }

  function disableLastEnabled() {
    var viewToDisable = viewHistory.value.shift();
    disableView(viewToDisable);
  }
} 
*/

const width = ref(window.innerWidth)

const maxViews = computed(() => {
  if(width.value < 800) return 1;
  if(width.value < 1200) return 2;
  return 3;
})

const isDesign = computed(() => {
  return currentActiveViews.value.design;
})

const isBuild = computed(() => {
  return currentActiveViews.value.build;
})

const numberActive = computed(() => {
  return isDesign.value + isBuild.value;
})

// Probs good to add debounce here
function updateWidth() {
  width.value = window.innerWidth;

  if(numberActive.value > maxViews.value){
    var removedView = viewHistory.value.shift();
    currentActiveViews.value[removedView] = false;
    emits('update:activeViews', currentActiveViews.value);
  }
}

onMounted(() => {
  window.addEventListener("resize", updateWidth);
})

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
})
</script>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  gap: 10px;
}

button {
  border: 1px solid var(--vt-c-soft);
  background: var(--vt-c-mute);
  color: var(--color-text);
  cursor: pointer;
  min-width: 90px;
  padding: 10px 20px;
  text-align: center;
  font-family: lexend;
  font-weight: 600
}

button.active {
  background: var(--color-button);
  border-color: var(--color-button-border);
}
</style>