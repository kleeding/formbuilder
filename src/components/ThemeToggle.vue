<template>
    <div class="theme-toggle" @click="toggleTheme()" >
        <Moon :active="currentTheme === 'dark'"/>
        <Sun :active="currentTheme === 'light'"/>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Sun from './icons/Sun.vue'
import Moon from './icons/Moon.vue'

const currentTheme = ref('')

function toggleTheme() {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem("theme", currentTheme.value);
    document.querySelector("html").setAttribute("data-theme", currentTheme.value);
}

function getTheme() {
    var theme = localStorage.getItem("theme");
    if(theme !== null){
        return theme
    }
    if(window.matchMedia("(prefers-color-scheme: dark)").matches){
        localStorage.setItem("theme", "dark");
        return 'dark'
    }
    localStorage.setItem("theme", "light");
    return 'light'
}

onMounted(() => {
  currentTheme.value = getTheme()
  document.querySelector("html").setAttribute("data-theme", currentTheme.value);
})
</script>

<style scoped>
img {
    width: 20px;
}

.theme-toggle {
    width: 36px;
    height: 100px;
}
</style>