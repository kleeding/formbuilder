<template>
    <header>
        <h1>{{ title }}</h1>
        <ThemeToggle />
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
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    font-size: 6vw;
}
</style>