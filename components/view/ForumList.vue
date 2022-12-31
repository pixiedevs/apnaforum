<script setup lang="ts">
import { nativeFetch } from "@/helpers/api";
import { getPersistData, setPersistData } from "@/helpers/cookie";
import Forum from "@/models/Forum";

const forums = useState<Forum[]>('forums')

onMounted(() => {
    if (getPersistData('forums-new')) {
        forums.value = getPersistData('forums-new')
    } else {
        nativeFetch('/api/forums/')
            .then((res) => res.json())
            .then((data) => {
                if (data.forums) {
                    forums.value = data.forums
                    setPersistData('forums-new', data.forums)
                }
            })
            .catch((err) => { })
    }
})

</script>

<template>
    <div class="container" v-if="forums">
        <strong>Top Forums: -</strong>
        <NuxtLink class="route outline-off2"
            :to="'/topics/?forum=' + forum.name" v-for="forum of forums"
            :key="forum.name">
            <strong class="row shadow border-x pointer my-2 p-2"
                :key="forum.name">
                {{ forum.name.asTitle() }}
            </strong>
        </NuxtLink>
    </div>
</template>
