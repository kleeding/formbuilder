<template>
    <span class="info-subtitle">Question Base</span>
    <span class="info-paragraph">
        Question objects describe all the attributes of each question in the form.
        The question type (component) can be one of:
    </span>
    <span class="info-paragraph">
    [ "text", "textarea", "radio", "select", "checkbox", "date" ]
    </span>
    <span class="info-paragraph">
        Each type of question has relevant attributes associated to it.
        All questions can include a required attribute, this automatically applies a non-empty validation check.
    </span>

    <span class="info-subsubtitle">
        Text / Textarea
    </span>
    <pre class="info-code"><code>{{ questionJsonText }}</code></pre>

    <span class="info-subsubtitle">
        Radio / Select / Checkbox
    </span>
    <pre class="info-code"><code>{{ questionJsonSelectRadioCheckbox }}</code></pre>

    <span class="info-subsubtitle">
        Date
    </span>
    <pre class="info-code"><code>{{ questionJsonDate }}</code></pre>

    <span class="info-subsubtitle">
        Shared Attributes
    </span>
    <pre class="info-code"><code>{{ sharedAttributes }}</code></pre>
</template>

<script setup>
const questionJsonText = `{
    "id": "124b465f-6071-491b-a30f-67be07ab8396"
    "model-name": "text1"
    "label": "What is your name?",
    "component": "text",       // "textarea" for textarea
    "placeholder": "Enter text here",
}`;

const questionJsonSelectRadioCheckbox = `{
    "id": "833b465f-6071-491b-a30f-67be07ab8396"
    "model-name": "radio1"
    "label": "Select yes or no:",
    "component": "radio",       // "select" / "checkbox"
    "options": "YesNo"
}`;

const questionJsonDate = `{
    "id": "378b465f-6071-491b-a30f-67be07ab8396"
    "model-name": "date1"
    "label": "Please select a date:",
    "component": "date",
}`;

const sharedAttributes = 
`"default": "",              // value on load
"questions": [],         // list of nest questions that depend on this question
"dependency": "",    // nested questions can be enabled based on parent question values
"required": "false",  // mandatory question - auto valiates non-empty
"valiation": []           // list of validation rules to applie to the question`
</script>