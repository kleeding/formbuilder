<template>
    <header>
        <div class="title">
            FormBuilder
        </div>
        <ThemeToggle class="theme-toggle"/>
    </header>
</template>

<script setup>
import ThemeToggle from './ThemeToggle.vue'
</script>

<style scoped>
header {
    height: 120px;
    width: min(600px, 100%);
    display: flex;
    align-items: center;
    padding: 1em;
}

.title {
    flex-grow: 1;
    text-align: center;
    font-size: min(4.75rem, calc(1rem + 8vw));
}
</style>