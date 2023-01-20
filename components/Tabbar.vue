<script setup lang="ts">
const { active, tabbars } = defineProps<{ active: number, tabbars: string[] }>()

const bars = ref<HTMLDivElement>();
const details = ref<HTMLDivElement>();

function tabbarToggler(e: MouseEvent) {
    if (e.currentTarget !== (e.target as HTMLDivElement).parentElement) return;
    for (let i = 0; i < bars.value.children.length && i < details.value.children.length; i++) {
        if (bars.value.children[i] === e.target) {
            bars.value.children[i].classList.add('active')
            details.value.children[i].classList.add('active')
        } else {
            bars.value.children[i].classList.remove('active')
            details.value.children[i].classList.remove('active')
        }
    }
}

onMounted(() => {
    bars.value.children[active ?? 0].classList.add('active')
    details.value.children[active ?? 0].classList.add('active')
})

</script>

<template>
    <div class="tabbar">

        <div class="tab-bar__bars" @click="tabbarToggler" ref="bars">
            <button v-for="tab in tabbars" :key="tab">{{ tab }}</button>
        </div>

        <div class="tab-bar__details t-delay-200" ref="details">
            <slot />
        </div>

    </div>
</template>

<style>
.tab-bar__bars {
    display: flex;
    column-gap: .5rem;
    row-gap: .5rem;
}

.tab-bar__bars>* {
    text-align: center;
    background-color: var(--card-bg);
    padding: .1rem 1rem;
    border-radius: 2rem;
    flex: 1 1 auto !important;
}

.tab-bar__bars>*:hover {
    background-color: var(--body-bg);
}

.tab-bar__bars>*:active,
.tab-bar__bars>*.active {
    background-color: var(--blur-bg);
}

.tab-bar__details {
    position: relative;
}

.tab-bar__details>*:not(.active) {
    position: absolute;
    top: 0;
    transform: translateX(-100vw);
    transition: all var(--transition);
}
</style>
