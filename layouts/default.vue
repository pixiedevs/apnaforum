<script setup lang="ts">
import AsideLeft from "@/components/view/AsideLeft.vue";
import AsideRight from "@/components/view/AsideRight.vue";
// import { is_bot } from "@/helpers/api";

const leftSidebar = useState('leftSidebar', () => false)
const rightSidebar = useState('rightSidebar', () => false)

const toggleAsideLeft = (e: MouseEvent) => {
    let t = e.target as HTMLElement
    // console.log(t, t.parentNode, t.closest(".aside-left"));
    if (t.tagName === 'A' || (t.tagName === 'BUTTON' && (t.classList.contains('toggler') || t.closest(".aside-left") == document.querySelector("aside.aside-left")))) {
        leftSidebar.value = false
    }
}
watch(rightSidebar, (value) => {
    localStorage.setItem('rightSidebar', value.toString())
})

onMounted(() => {
    // console.log(is_bot())
    
    rightSidebar.value = localStorage.getItem('rightSidebar') === 'true'
})

</script>

<template>
    <div id="view">
        <!-- <ClientOnly> -->
        <div class="aside-left-toggler toggler"
            @click="leftSidebar = !leftSidebar" title="Show drawer">
        </div>
        <AsideLeft :class="{ 'show': leftSidebar }" @click="toggleAsideLeft" />
        <!-- </ClientOnly> -->

        <main id="main">
            <slot />
        </main>

        <!-- <ClientOnly> -->
        <label for="rightAside-toggler"><span class="shadow py-5"
                title="Toggle sidebar">&gt;</span>
        </label>
        <input id="rightAside-toggler" type="checkbox" class="hidden"
            name="rightAside" v-model="rightSidebar">


        <AsideRight />
        <!-- </ClientOnly> -->

    </div>
</template>