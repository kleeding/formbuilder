<template>
    <div class="toolbox-element">
        <div v-if="setDelete" class="toolbox-element-info toolbox-element-question">
            <div class="deletion-message">
                <div @click="deleteSection()"><img src="@/components/icons/check.svg"></div>
                CONFIRM DELETION
                <div @click="toggleDelete()"><img src="@/components/icons/cross.svg"></div>
            </div>
        </div>

        <div v-else class="toolbox-element-info toolbox-element-question">
            <span class="toolbox-element-title">{{'↳'.repeat(position.length - 1)}} Question</span>
            <div class="question-settings">
                <div class="question-setting">
                    <span class="toolbox-element-title">Field</span>
                    <input v-if="editEnabled" type="text" v-model="currentQuestion['model-name']" name="field" placeholder="Enter a question field name" />
                    <span v-else >{{ currentQuestion['model-name'] }}</span>
                </div>

                <div class="question-setting">
                    <span class="toolbox-element-title">Label:</span>
                    <input v-if="editEnabled" type="text" v-model="currentQuestion.label" name="label" placeholder="Enter a question label" />
                    <span v-else >{{ currentQuestion.label }}</span>
                </div>

                <div class="question-setting">
                    <span class="toolbox-element-title">Component type:</span>
                    <div v-if="editEnabled">
                        <select v-model="currentQuestion.component" name="component" >
                            <option v-for="option in componentTypes" :value="option">
                                {{ option }}
                            </option>
                        </select>
                    </div>
                    <div v-else>{{ currentQuestion.component }}</div>
                </div>

                <div v-if="['text','textarea'].includes(currentQuestion.component)" class="question-setting">
                    <span class="toolbox-element-title">Placeholder:</span>
                    <input v-if="editEnabled" type="text" v-model="currentQuestion.placeholder" name="label" placeholder="Enter placeholder text" />
                    <span v-else >{{ currentQuestion.placeholder }}</span>
                </div>

                <div v-if="['select', 'radio', 'checkbox'].includes(currentQuestion.component)" class="question-setting">
                    <span class="toolbox-element-title">Options:</span>
                    <select v-if="editEnabled" v-model="currentQuestion.options" name="component" >
                        <option v-for="option in optionsList" :value="option">
                            {{ option }}
                        </option>
                    </select>
                    <span v-else >{{ currentQuestion.options }}</span>
                </div>

                <div class="question-setting">
                    <span class="toolbox-element-title">Default:</span>
                    <input v-if="editEnabled" type="text" v-model="currentQuestion.default" name="label" placeholder="Enter a default value" />
                    <span v-else >{{ currentQuestion.default }}</span>
                </div>

                <div class="question-setting">
                    <span class="toolbox-element-title">Required:</span>
                    
                    <div v-if="editEnabled" class="radio-container">
                        <div class="radio-input-container" v-for="option in ['true', 'false']" name="required">       
                            <input type="radio" class="radio-button" :id="option" :value="option" v-model="currentQuestion.required" />
                            <span class="radio-label">{{ option }}</span>
                        </div>
                    </div>
                    <span v-else >{{ currentQuestion.required }}</span>
                </div>
            </div>
        </div>
        
        <div v-if="!setDelete" class="toolbox-side-controls">
            <div style="width: 36px; height: 36px;">
                <div v-if="editEnabled" @click="toggleEdit"><img src="@/components/icons/save.svg"></div>
                <div v-else @click="toggleEdit"><img src="@/components/icons/edit.svg"></div>
            </div>
            <div>
                <div v-if="expand" @click="toggleExpand()"><img src="@/components/icons/collapse.svg"></div>
                <div v-else @click="toggleExpand()"><img src="@/components/icons/expand.svg"></div>
            </div>
        </div>

        <div v-if="editEnabled && !setDelete" class="delete-button-container">
            <div class="delete-element-button" @click="toggleDelete()"><img src="@/components/icons/delete.svg"></div>
        </div>
    </div>
    
    <div :class="['toolbox-sections', { ['collapsed']: !expand }]">
        <NewQuestion :position="[...position, 0]"/>
        <Question v-for="(question, index) in currentQuestion.questions" :key="question.id" :position="[...position, index]"/>
    </div>
    <NewQuestion :position="getEndPosition()"/>
</template>

<script setup>
import { ref, computed, watch, inject } from 'vue';
import NewQuestion from './NewQuestion.vue';

const editEnabled = ref(false);
const expand = ref(false);
const setDelete = ref(false);

const { toolboxForm, updateForm } = inject('data');

const props = defineProps({
    position: {
        type: Object,
        required: true
    }
})

const currentQuestion = ref(setupQuestion());

function setupQuestion() {
    var positions = [...props.position];
    var question = JSON.parse(JSON.stringify(toolboxForm.value.sections[positions.shift()]));

    while (positions.length > 0){
        question = question.questions[positions.shift()];
    }

    if(!question.id) question.id = crypto.randomUUID();
    if(!question['model-name']) question['model-name'] = "";
    if(!question.label) question.label = "";
    if(!question.component) question.component = "";
    if(!question.required) question.required = "false";
    if(!question.placeholder) question.placeholder = "";
    if(!question.default) question.default = "";
    if(!question.options) question.options = "";

    return question;
}

watch(editEnabled, (enabled) => {
    if(enabled) return;
    var baseForm = JSON.parse(JSON.stringify(toolboxForm.value));

    var positions = [...props.position];
    var parts = [baseForm.sections[positions.shift()]];

    while (positions.length > 1){
        parts.push(parts[parts.length - 1].questions[positions.shift()])
    }

    positions = [...props.position];
    var curPart = parts.pop();
    curPart.questions[positions.pop()] = currentQuestion.value;

    var newPart;
    while (positions.length > 1) {
        newPart = parts.pop()
        newPart.questions[positions.pop()] = curPart
        curPart = newPart
    }

    baseForm.sections[positions[0]] = curPart;

    updateForm(baseForm);
})

function toggleEdit() {
    editEnabled.value = !editEnabled.value;
}

function toggleExpand() {
    expand.value = !expand.value;
}

function toggleDelete() {
    setDelete.value = !setDelete.value;
}

function deleteSection() {
    var baseForm = JSON.parse(JSON.stringify(toolboxForm.value));

    var positions = [...props.position];
    var parts = [baseForm.sections[positions.shift()]];

    while (positions.length > 1){
        parts.push(parts[parts.length - 1].questions[positions.shift()])
    }

    positions = [...props.position];
    var curPart = parts.pop();
    curPart.questions.splice([positions.pop()],1)

    var newPart;
    while (positions.length > 1) {
        newPart = parts.pop()
        newPart.questions[positions.pop()] = curPart
        curPart = newPart
    }

    baseForm.sections[positions[0]] = curPart;

    updateForm(baseForm);
}

function getEndPosition(){
    var positions = [...props.position];
    positions[positions.length - 1]++;
    return positions;
}

watch(toolboxForm, () => {
    currentQuestion.value = setupQuestion();
})

const componentTypes = [ "text", "textarea", "select", "radio", "checkbox", "date" ];

const optionsList = computed(() => {
    return Object.keys(toolboxForm.value.options);
})
</script>

<style scoped>
.toolbox-element {
  background-color: rgba(255, 153, 0, 0.096);
}

.toolbox-element-question {
  min-height: 257px;
  gap: 1em;
}
</style>