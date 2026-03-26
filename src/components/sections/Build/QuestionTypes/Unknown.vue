<template>
    <div class="unknown-type">
        *** Unknown Question Type ***
    </div>
</template>

<script setup>
defineProps({
    details: {
        type: Object,
        required: false
    }
})
</script>

<style scoped>
.unknown-type {
    color: var(--color-button-border); /* NEED TO UPDATE COLOR VARIABLES SO THIS ISNT CALLING THE BUTTON COLOUR */
    align-self: center;
}
</style>