<template>
    <span class="info-subtitle">Form Base</span>
    <span class="info-paragraph">
    All forms follow this basic structure:
    </span>
    <pre class="info-code"><code>{{ formJson }}</code></pre>
</template>

<script setup>
const formJson = `{
    "title": "The Form Title",      // omittable
    "sections": [],                       // list of sections
    "options": {}                         // dictionary of options
}`;
</script>