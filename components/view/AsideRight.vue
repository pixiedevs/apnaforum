<script setup>
import Search from "@/components/view/Search.vue"
import RoutesList from "@/components/view/RoutesList.vue"
import TopUserList from "@/components/view/TopUserList.vue"
import { updateTopUsers } from '@/helpers/storeService';


function fetchData(e, o) {
    if (e.intersectionRatio !== 1) return;

    updateTopUsers()
    o.disconnect()
}

</script>

<template>
    <aside class="aside-right p-2 w-100">
        <Search class="m-3" />

        <RoutesList class="m-3" />

        <TopUserList class="m-3" />

        <Observer :id="'component-datafetch-observer-down'"
            :onIntersect="fetchData" />
    </aside>
</template>
