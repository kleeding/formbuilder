<template>
    <header>
        <h1>{{ title }}</h1>
        <ThemeToggle class="theme-toggle"/>
    </header>
</template>

<script setup>
import ThemeToggle from './ThemeToggle.vue'

defineProps({
    title: {
        type: String,
        required: true,
    }
})
</script>

<style scoped>
header {
    max-width: 600px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin: auto;
    container-type: inline-size;
}

h1 {
    font-size: 15cqw;
}
</style>