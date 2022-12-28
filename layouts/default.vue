<script setup lang="ts">
import AsideLeft from "@/components/view/AsideLeft.vue";
import AsideRight from "@/components/view/AsideRight.vue";

const leftSidebar = useState('leftSidebar', () => false)

const toggleAsideLeft = (e: MouseEvent) => {
    let t = e.target as HTMLElement
    // console.log(t, t.parentNode, t.closest(".aside-left"));
    if (t.tagName === 'A' || (t.tagName === 'BUTTON' && (t.classList.contains('toggler') || t.closest(".aside-left") == document.querySelector("aside.aside-left")))) {
        leftSidebar.value = false
    }
}

</script>

<template>
    <div id="view">
        <!-- <ClientOnly> -->
            <div class="aside-left-toggler toggler"
                @click="leftSidebar = !leftSidebar" title="Show drawer">
            </div>
            <AsideLeft :class="{ 'show': leftSidebar }"
                @click="toggleAsideLeft" />
        <!-- </ClientOnly> -->

        <main id="main">
            <slot />
        </main>

        <!-- <ClientOnly> -->
            <AsideRight />
        <!-- </ClientOnly> -->

    </div>
</template>
