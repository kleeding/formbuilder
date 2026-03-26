<script setup>
import { ref, computed } from 'vue'
import Header from './components/Header.vue'
import Nav from './components/Nav.vue'
import Design from './components/Design.vue'

const activeViews = ref({
  'design': true,
  'build': false,
  'output': false
})
const jsonInput = ref(`[
  {
    "id": 1,
    "question": "What is your name?",
    "component": "text"
  },
  {
    "id": 2,
    "question": "Describe your experience",
    "component": "textarea"
  }
]`)

const formData = computed(() => {
  try {
    return JSON.parse(jsonInput.value)
  } catch (e) {
    return null // Returns null if JSON is invalid
  }
})
</script>

<template>
  <Header />

  <Nav 
    v-model:activeViews="activeViews"
    :build-disabled="!formData"
  />

  <main class="content-area">
    <Design 
      v-model:jsonInput="jsonInput"
      :is-enabled="activeViews.design === true"
      :is-form-invalid="!formData"
    />
    
    <section v-if="activeViews.build === true" class="build-view">
      <!-- This will be made into a component -->
      <!-- IF THE FORM IS THE FIRST COMPONENT HERE IT CAN HAVE DEDICATED SCOPED CSS -->
      <form @submit.prevent>
        <!-- 
        THIS IS PRETTY GOOD FOR GENERIC FORM BUT WILL MAKE 
        THIS INTO COMPONENT FOR RECURSIVE COMPONENTS
        THAT WAY I CAN HAVE QUESTION DEPENDENCIES
        -->
        <div v-for="field in formData" :key="field.id" class="form-group">
          <label>{{ field.question }}</label>
          
          <input v-if="field.component === 'text'" type="text" />
          <textarea v-else-if="field.component === 'textarea'" class="form-text"></textarea>
          <p v-else>Unknown component type: {{ field.component }}</p>
        </div>
        <div class="submit-row">
          <button type="submit" @click="console.log('clicked submit')" class="submit-btn">Submit Form</button>
        </div>
      </form>
    </section>
    <!-- ################################## -->

    <section v-if="activeViews.output === true" class="build-view">
      <!-- This will be made into a component -->
      <h3>Form Output</h3>
    </section>
  </main>
</template>

<style>
.content-area {
  /* background-color: rgba(250, 235, 215, 0.13); */
  display: flex;
  flex-flow: row nowrap;
  flex-grow: 1;
  width: 100%;
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



<!--
<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import TheWelcome from "./components/TheWelcome.vue";
import FormBuilderTitle from "./components/FormBuilderTitle.vue";
</script>
-->

<!-- <template>
  <header> -->
    <!-- <img
      alt="Vue logo"
      class="logo"
      src="./assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div> -->
    <!-- <div class="wrapper">
      <FormBuilderTitle msg="You did it!" />
    </div>
    
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
} -->

<!-- @media (min-width: 1024px) {
  /* header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  } */

  /* .logo {
    margin: 0 2rem 0 0;
  } */

  /* header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  } */
}
</style> -->
