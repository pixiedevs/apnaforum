<script setup>
import AuthUserProfile from "@/components/view/AuthUserProfile.vue";
import { showAllToasts, showToast } from "@/helpers/appState";
import RoutesList from "@/components/view/RoutesList.vue";
import ForumListComponent from "@/components/view/ForumList.vue";
import { updateForums } from '@/helpers/storeService';


function fetchData(e, o) {
    if (e.intersectionRatio !== 1) return;

    updateForums()
    o.disconnect()
}

</script>

<template>
    <aside class="aside-left card-bg pt-5">
        <ClientOnly>
            <AuthUserProfile class='mx-auto text-center' />
        </ClientOnly>

        <div class="text-center">
            <button class="small mx-5" @click="showAllToasts()">Show
                toasts</button>
            <button class="small mx-5"
                @click="showToast('Do Nothing button!', 'debug', 5)">Do
                Nothing</button>
        </div>

        <RoutesList class="mx-3 my-5" />

        <ForumListComponent />

        <Observer :id="'component-datafetch-observer-left'"
            :onIntersect="fetchData" />

    </aside>
</template>
