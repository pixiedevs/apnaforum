<script setup>
import Search from "@/components/view/Search.vue"
import RoutesList from "@/components/view/RoutesList.vue"
import TopUserList from "@/components/view/TopUserList.vue"

</script>

<template>
    <aside class="aside-right p-2 w-100">
        <Search class="m-3" />

        <RoutesList class="m-3" />

        <TopUserList class="m-3" />
    </aside>
</template>
