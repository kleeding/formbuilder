<template>
    <div class="toolbox-element option-container">
        <div v-if="setDelete" class="toolbox-element-info">
            <div class="deletion-message">
                <div @click="deleteOptionList()"><img src="@/components/icons/check.svg"></div>
                CONFIRM DELETION
                <div @click="toggleDelete()"><img src="@/components/icons/cross.svg"></div>
            </div>
        </div>

        <div v-else class="toolbox-element-info">
            <input v-if="editEnabled" type="text" class="toolbox-input" v-model="currentOptionName" name="title" placeholder="Enter an option name" />
            <span v-else class="toolbox-label">{{ currentOptionName }}</span>
            <table>
                <thead>
                    <tr>
                        <th class="toolbox-element-title" style="width: 50%;">Label</th>
                        <th class="toolbox-element-title" style="width: 50%;">Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(option, index) in currentOptionList">
                        <td v-if="editEnabled">
                            <input v-if="editEnabled" type="text" class="toolbox-input" v-model="option.label" name="title" placeholder="Enter a label" />
                        </td>
                        <td v-else style="text-align: center;">{{ option.label }}</td>
                        <td v-if="editEnabled">
                            <input v-if="editEnabled" type="text" class="toolbox-input" v-model="option.value" name="title" placeholder="Enter a value" />
                            <div style="position: relative;">
                                <div style="height: 24px; position: absolute; bottom: 0px; right: -22px; scale: 0.8;" @click="deleteOption(index)">
                                    <img src="@/components/icons/delete.svg">
                                </div>
                            </div>
                        </td>
                        <td v-else style="text-align: center;">{{ option.value }}</td>
                    </tr>
                    <tr v-if="editEnabled">
                        <td colspan=2><div style="text-align: center;" @click="addOption()"><img src="@/components/icons/edit.svg"></div></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-if="!setDelete" class="toolbox-side-controls">
            <div style="width: 36px; height: 36px;">
                <div v-if="editEnabled" @click="toggleEdit"><img src="@/components/icons/save.svg"></div>
                <div v-else @click="toggleEdit"><img src="@/components/icons/edit.svg"></div>
            </div>
        </div>

        <div v-if="editEnabled && !setDelete" class="delete-button-container">
            <div class="delete-element-button" @click="toggleDelete()"><img src="@/components/icons/delete.svg"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, inject } from 'vue';

const editEnabled = ref(false);
const setDelete = ref(false);

const { toolboxForm, updateForm } = inject('data');

const props = defineProps({
    optionName: {
        type: String,
        required: true
    }
})

const currentOptionName = ref(props);
const currentOptionList = ref([]);
setupOption();

function setupOption() {
    currentOptionName.value = JSON.parse(JSON.stringify(props.optionName));
    var baseOptionList = JSON.parse(JSON.stringify(toolboxForm.value.options[props.optionName]));

    if(!baseOptionList) baseOptionList = []

    currentOptionList.value = baseOptionList;
}

watch(toolboxForm, () => {
    setupOption();
})

function getOptionKey(option, index) {
    if(option === null) return "";
    var key = "";
    console.log(option);
    if(option.label) key += option.label;
    if(option.value) key += option.value;
    key += index;
    return key;
}

function toggleEdit() {
    editEnabled.value = !editEnabled.value;
    if(editEnabled.value) return;
    var baseForm = JSON.parse(JSON.stringify(toolboxForm.value));
    delete baseForm.options[props.optionName];
    baseForm.options[currentOptionName.value] = currentOptionList.value;
    updateForm(baseForm);
}

function toggleDelete() {
    setDelete.value = !setDelete.value;
}

function addOption() {
    var newOption = {
        "label":"",
        "value":"",
    }
    currentOptionList.value.push(newOption);
}

function deleteOption(index) {
    var baseForm =  JSON.parse(JSON.stringify(toolboxForm.value));
    delete baseForm.options[props.optionName].splice(index, 1);
    updateForm(baseForm);
}

function deleteOptionList() {
    var baseForm =  JSON.parse(JSON.stringify(toolboxForm.value));
    delete baseForm.options[props.optionName];
    updateForm(baseForm);
}

</script>

<style scoped>
.option-container {
 margin: 0.4em 0;
}
</style>