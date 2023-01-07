<script setup lang="ts">
const { name } = defineProps<{ name: string }>()
</script>

<template>
    <img :src="'https://source.boringavatars.com/beam/120/' + name"
        loading="lazy" />
</template>
