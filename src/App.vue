<script setup>
import { ref, provide, onMounted } from 'vue'
import { createModel } from './components/javascript/model'
import Header from './components/Header.vue'
import Nav from './components/Nav.vue'
import Design from './components/sections/Design.vue'
import Build from './components/sections/Build.vue'

const activeViews = ref({
    'design': true,
    'build': false,
    'output': false
})

const formData = ref({});
const formModel = ref({});

provide('model', {
    formModel,
    updateFormModel
});

function updateFormModel(name, newValue) {
  if(formModel.value.hasOwnProperty(name)) {
      formModel.value[name].value = newValue;
      formModel.value[name].validation = [];
  }
}

onMounted(() => {
  formModel.value = createModel(formData.value, formModel.value);
})
</script>

<template>
  <Header />

  <Nav
    v-model:activeViews="activeViews"
    :build-disabled="false"
  />

  <main class="content-area">
    <Design 
      v-if="activeViews.design === true"
      v-model:formData="formData"
    />

    <Build
      v-if="activeViews.build === true"
      v-model:formModel="formModel"
      :formData="formData"
    />

    <!-- <section v-if="activeViews.output === true" class="build-view"> -->
      <!-- This will be made into a component -->
      <!-- <h3>Form Output</h3>
    </section> -->
  </main>
</template>

<style>
.content-area {
  display: flex;
  flex-flow: row nowrap;
  flex-grow: 1;
  width: 100%;
  max-width: 1200px;
  justify-self: center;
  justify-content: center;
  gap: 1em;
  padding: 1em;
}
</style>
