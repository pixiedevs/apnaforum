<script setup>
import TopUserList from "@/components/view/TopUserList.vue"
import RoutesList from "@/components/view/RoutesList.vue"

</script>

<template>
    <aside class="aside-right p-2">
        <RoutesList class="m-3" />

        <TopUserList />

        <div class="card-group">
            <div class="card p-1" v-for="n in 5" :key="n">
                <div class="card-body bg-primary2n text-grn rounded p-3 m-0">
                    <div class="card-text">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Amet consequuntur sint magnam libero
                        qui,
                        id ipsum voluptates quisquam tempore suscipit est a
                    </div>
                </div>
            </div>
        </div>
    </aside>
</template>
