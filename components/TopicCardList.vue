<script setup lang="ts">
import { TopicShort } from "@/models/Topic";

defineProps({
    topics: Array<TopicShort>,
})

</script>

<template>
    <div class="container-lg m-auto">
        <NuxtLink class="outline-off2" :to="'/topics/' + topic.slug"
            v-for="topic of topics" :key="topic.slug">
            <div class="card col pointer my-3 shadow border-x"
                :key="topic.slug">
                <strong class="card-title mb-1"> {{ topic.name }} </strong>
                <div class="d-flex justify-content-between">
                    <!-- <ClientOnly> -->
                        <small>{{ topic.authorName.asTitle() }}</small>
                        <small>{{ topic.time.asTime() }}</small>
                    <!-- </ClientOnly> -->
                    <small>Likes: {{ topic.likes }}</small>
                </div>
            </div>
        </NuxtLink>
    </div>
</template>
