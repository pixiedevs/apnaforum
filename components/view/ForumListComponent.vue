<script setup lang="ts">
import { nativeFetch } from "@/helpers/api";
import Forum from "@/models/Forum";

const forums = useState<Forum[]>('forums')

onMounted(() => {
    nativeFetch('/api/forums/?res_type=api')
        .then((res) => res.json())
        .then((data) => {
            forums.value = data.forums
        })
        .catch((err) => { })
})

</script>

<template>
    <div class="container" v-if="forums">
        <strong>Top Forums: -</strong>
        <NuxtLink class="route outline-off2" :to="'/topics/?forum=' + forum.name"
            v-for="forum of forums" :key="forum.name">
            <strong class="row shadow border-x pointer my-2 p-2"
                :key="forum.name">
                {{ forum.name }}
            </strong>
        </NuxtLink>
    </div>
</template>
