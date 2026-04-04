<template>
  <div :class="[ 'modal', { 'hide': !showInfoModal }]">
    <span class="info-title">INFO</span>
    <span class="info-paragraph">
        The following are tables describing the various fields and attributes that can be included in the JSON schema.
    </span>
    <div class="info-section">
      <span class="info-title">Section</span>
      <table class="info-table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>id</td>
            <td>Unique Identifier</td>
          </tr>
          <tr>
            <td>Title</td>
            <td>The title for this section</td>
          </tr>
          <tr>
            <td>Questions</td>
            <td>An array containing all the sections questions</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="info-section">
      <span class="info-title">Question</span>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>id</td>
            <td>Unique Identifier</td>
          </tr>
          <tr>
            <td>model-name</td>
            <td>The name of the field in the model</td>
          </tr>
          <tr>
            <td>Label</td>
            <td>The question itself</td>
          </tr>
          <tr>
            <td>Component</td>
            <td>type of input from: 'text', 'textarea', 'radio', 'select', 'checkbox', 'date'</td>
          </tr>
          <tr>
            <td>Required</td>
            <td>Sets whether a question is required to be answered by the user, this automatically validates for non-empty</td>
          </tr>
          <tr>
            <td>Default</td>
            <td>Initial value set on input</td>
          </tr>
          <tr>
            <td>Placeholder</td>
            <td>Text that appears on text input fields with no text</td>
          </tr>
          <tr>
            <td>Options</td>
            <td>The name of a set of options</td>
          </tr>
          <tr>
            <td>Dependency</td>
            <td>Nested questions can depend on the value of their parent question</td>
          </tr>
          <tr>
            <td>Validation</td>
            <td>
                Input validation on submission, choice from: 'alpha', 'numeric', 'alphanumeric', 'validsymbols', 'range', 'greater', 'less'
                <br>
                'range', 'greater', 'less' are set by including number params after dashes, e.g., 'range-100-200' validates that input is between 100 and 200 inclusive
            </td>
          </tr>
          <tr>
            <td>min/max</td>
            <td>The number of days in the past/future the date input can be set to</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
    showInfoModal: {
        type: Boolean,
        required: true
    }
})
</script>

<style scoped>
.modal {
  position: absolute;
  top: 200px;
  background-color: var(--color-background-chill);
  min-width: 320px;
  max-width: 400px;
  /* height: 600px; */
  /* overflow: auto; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  border: 5px solid var(--color-border);
  box-shadow: 8px 8px 15px 3px var(--color-background);
  padding: 0 1.5em;

}

.hide {
  display: none;
}

.info-title {
  font-weight: 900;
  font-size: 1.5rem;
}

.info-paragraph {
    font-weight: 300;
}

.info-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

table {
    /* background-color: var(--color-background-chill); */
    width: 100%;
    color: var(--color-background)
}

th {
    font-weight: 800;
}

th, td {
    background-color: var(--vt-c-text-2);
    /* width: 50%; */
    text-align: center;
    padding: 0 1em;
    text-wrap: wrap;
}
</style>