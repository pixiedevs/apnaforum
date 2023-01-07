<script setup>
import TopUserList from "@/components/view/TopUserList.vue"
import RoutesList from "@/components/view/RoutesList.vue"
import TopCommentsList from "@/components/view/TopCommentsList.vue"

</script>

<template>
    <aside class="aside-right p-2 w-100">
        <RoutesList class="m-3" />

        <TopUserList class="m-3" />

        <TopCommentsList class="m-3" />
    </aside>
</template>
