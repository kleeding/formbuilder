<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'
import Nav from './components/Nav.vue'
import Design from './components/sections/Design.vue'
import Build from './components/sections/Build.vue'

const activeViews = ref({
    'design': true,
    'build': true,
    'output': false
})

const formData = ref({});
const formResult = ref({});
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

    <!-- :is-form-invalid="!formData.valid" -->

    <Build
      v-if="activeViews.build === true"
      v-model:formResult="formResult"
      :form-data="formData"
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

textarea {
  width: 100%;
  font-family: lexend;
  padding: 10px;
  resize: vertical;
  flex-grow: 1;
  /* box-sizing: border-box; */
  /* margin: auto; */
}

.form-text {
  width: 100%;
  min-height: 200px;
  font-family: lexend;
  padding: 10px;
  box-sizing: border-box;
  margin: auto;
  min-width: 100%;
  max-width: 100%;
}

.form-group {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}

label { font-weight: bold; margin-bottom: 0.5rem; }

.submit-row {
  display: flex;
  justify-content: center;
}

.submit-btn {
  padding: 10px 20px;
  cursor: pointer;
  border: 1px solid #ccc;
  background: white;
  min-width: 90px;
  text-align: center;
  font-family: lexend;
  font-weight: 600;
  background: #35495e;
  color: white;
}
</style>
