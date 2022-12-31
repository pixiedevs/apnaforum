<script setup>
import AuthUserProfile from "@/components/view/AuthUserProfile.vue";
import { showAllToasts, showToast } from "@/helpers/appState";
import RoutesList from "@/components/view/RoutesList.vue";
import ForumListComponent from "@/components/view/ForumList.vue";

</script>

<template>
    <aside class="aside-left card-bg">

        <AuthUserProfile class='mt-5 mx-auto text-center' />

        <div class="text-center">
            <button class="small mx-5" @click="showAllToasts()">Show
                toasts</button>
            <button class="small mx-5"
                @click="showToast('Do Nothing button!', 'debug', 5000)">Do
                Nothing</button>
        </div>

        <RoutesList class="mx-3 my-5" />

        <ForumListComponent />

        <div class="card-group">
            <div class="card p-1" v-for="n in 10" :key="n">
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
