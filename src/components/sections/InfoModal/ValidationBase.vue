<template>
    <span class="info-subtitle">Question Validation</span>
    <span class="info-paragraph">
        Every question can have a list of validation functions applied to it. 
        These are functions that validate the question input before submission.
    </span>
    <span class="info-paragraph">
        Any of the following can be added:
    </span>
    <pre class="info-code"><code>{{ sectionJson }}</code></pre>
    <span class="info-paragraph">
        Parameters can be passed to [ "range", "greater", "less" ] separated by dashes:
    </span>
    <pre class="info-code"><code>{{ paramExampleJson }}</code></pre>
</template>

<script setup>
const sectionJson = `[
    "nonempty",        // this is auto-applied with required field set to true
    "alpha",                // checks for alphabet letters only
    "numeric",            // checks for numbers only
    "alphanumeric",  // checks for alphabet letters and numbers only
    "validsymbols",   // checks for no invalid symbols "<>#&{}"
    "range",               // checks number are within a range
    "greater",            // checks number is greater than a specified value
    "less",                   // checks number is less than a specified value
]`;

const paramExampleJson = 
`"range-100-200",  // between 100 and 200
"greater-100",       // greater than or equal to 100
"less-200",             // less than or equal to 200
`;
</script>