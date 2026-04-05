<template>
    <span class="info-subtitle">Section Base</span>
    <span class="info-paragraph">
        Section and Question ids are unique identifies (can be any unique string/number) used to make sure the lists are rendered properly.
        These are generated automatically in the toolbox editor. 
        If creating these manually, edit and save them in the toolbox to generate these.
    </span>
    <pre class="info-code"><code>{{ sectionJson }}</code></pre>
</template>

<script setup>
const sectionJson = `{
    "id": "c4328808-cb4b-475e-91a2-a0855cec4ad5",
    "title": "This is a Section Title",      // omittable
    "questions": []     // list of questions in this section
}`;
</script>