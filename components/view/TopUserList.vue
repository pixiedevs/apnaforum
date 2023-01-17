<script setup lang="ts">
import useStore from "@/composables/store";

const store = useStore()

</script>

<template>
    <div class="d-flex flex-column" v-if="store.topUsers.length > 0">
        <strong>Top Users: -</strong>
        <NuxtLink class="outline-off2 route button button-outline small"
            :to="'/u/' + user.username" v-for="user of store.topUsers"
            :key="user.username" v-once>
            {{ user.username }}
        </NuxtLink>
    </div>
</template>
