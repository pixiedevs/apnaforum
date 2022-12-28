<script setup lang="ts">
import { getRoutes } from "@/composables/utils";
</script>

<template>
    <div class="d-flex flex-column">
        <strong>Routes: -</strong>
        <NuxtLink v-for="route in getRoutes()" :key="route.path" :to="route.path"
            class="route button button-outline small">
            {{ route.name }}
        </NuxtLink>
    </div>
</template>
