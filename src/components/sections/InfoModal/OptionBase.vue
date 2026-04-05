<template>
    <span class="info-subtitle">Option Base</span>
    <span class="info-paragraph">
        Each option is a key-value pair. 
        The key is the name of the option, this is is then included in the options attribute for relevant question types. 
        The value is a list of label/value objects that make up the options to choose from.
    </span>
    <pre class="info-code"><code>{{ optionJson }}</code></pre>
    <span class="info-paragraph">
        Here's an example for a yes/no option:
    </span>
    <pre class="info-code"><code>{{ optionExampleJson }}</code></pre>
</template>

<script setup>
const optionJson = 
` "OptionName": [
        {
            "label": "option1",
            "value": "1"
        }
    ]`;

    const optionExampleJson = 
` "YesNo": [
        {
            "label": "Yes",
            "value": "1"
        },
        {
            "label": "Yes",
            "value": "1"
        }
    ]`;
</script>