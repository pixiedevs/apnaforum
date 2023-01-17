<script setup lang="ts">
const { id, onIntersect, threshold } = defineProps<{ id: string, onIntersect: Function, threshold?: [1] }>()
var observer: IntersectionObserver;

onMounted(() => {
    setTimeout(() => {
        observer = new IntersectionObserver((entries, observe) => {
            entries.forEach(e => { onIntersect(e, observe) })
        }, { threshold: threshold })
        observer.observe(document.getElementById(id))
    }, 2000);
})

onUnmounted(() => {
    observer.disconnect()
})
</script>

<template>
    <div :id="id"></div>
</template>
