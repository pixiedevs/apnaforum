<script setup>
import useStore from '@/composables/store';

const store = useStore()
</script>

<template>
    <div class="container" v-if="store.latestForums.length > 0">
        <strong>Top Forums: -</strong>
        <NuxtLink class="route outline-off2"
            :to="'/topics/?forum=' + forum.name"
            v-for="forum of store.latestForums" :key="forum.name">
            <strong class="row shadow border-x pointer my-2 p-2"
                :key="forum.name">
                {{ forum.name.asTitle() }}
            </strong>
        </NuxtLink>
    </div>
</template>
