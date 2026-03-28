<script setup>
import { ref, computed } from 'vue'
import Header from './components/Header.vue'
import Nav from './components/Nav.vue'
import Design from './components/sections/Design.vue'
import Build from './components/sections/Build.vue'

const activeViews = ref({
    'design': true,
    'build': false,
    'output': false
})
const jsonInput = ref(`{
    "title": "My First Form",
    "sections": [
        {
            "id": "1",
            "title": "The First Section",
            "questions": [
                {
                    "id": "1.1",
                    "model-name": "q1",
                    "label": "Is this a text input?",
                    "component": "text",
                    "placeholder": "placeholder text goes here"
                },
                {
                    "id": "2.3",
                    "model-name": "q2",
                    "label": "This is a select?",
                    "component": "radio",
                    "default": "1",
                    "options": [
                        {
                            "label": "Yes",
                            "value": "1"
                        },
                        {
                            "label": "No",
                            "value": "0"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2",
            "title": "The Second Section",
            "questions": [
                {
                    "id": "2.1",
                    "model-name": "q2.1",
                    "label": "Another text input?",
                    "component": "text",
                    "default": "This is a default set text input",
                    "required": "true"
                },
                {
                    "id": "2.2",
                    "model-name": "q2.2",
                    "label": "This is a textarea?",
                    "component": "textarea"
                },
                {
                    "id": "2.3",
                    "model-name": "q2.3",
                    "label": "This is a select?",
                    "component": "select",
                    "options": [
                        {
                            "label": "Please Select",
                            "value": "0"
                        },
                        {
                            "label": "One",
                            "value": "1"
                        },
                        {
                            "label": "Two",
                            "value": "2"
                        },
                        {
                            "label": "Three",
                            "value": "3"
                        }
                    ],
                    "required": "true"
                }
            ]
        }
    ],
    "questions": [
        {
            "id": "m.1",
            "model-name": "qm.1",
            "label": "Untitled section question?",
            "component": "textarea",
            "questions": [
                {
                    "id": "m.1.1",
                    "model-name": "qm.1.1",
                    "label": "This is a child question?",
                    "component": "text"
                }
            ]
        }
    ]
}`)

// Memory of the form data so if there is an error last non-error form builds
const oldFormData = ref(JSON.parse(jsonInput.value));
oldFormData.value.valid = true;

const formModel = ref(setupFormModel());
function setupFormModel(){
    var model = {};
    const stack = [oldFormData.value];
    while (stack?.length > 0) {
        const currentObj = stack.pop();
        Object.keys(currentObj).forEach(key => {
            if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
                if (key === 'questions'){
                    currentObj[key].forEach((question) => {
                        var defaultValue = question.default ?? (question.component === 'select' ? 0 : "");
                        model[question['model-name']] = defaultValue;
                    })
                }
                stack.push(currentObj[key]);
            }
        });
    }
    return model;
}

const formData = computed(() => {
    try {
        oldFormData.value = JSON.parse(jsonInput.value);
        oldFormData.value.valid = true;
    } catch (e) {
        oldFormData.value.valid = false;
    }
    return oldFormData.value;
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
      :is-form-invalid="!formData.valid"
    />

    <Build
      :form-data="formData"
      :is-enabled="activeViews.build === true"
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
