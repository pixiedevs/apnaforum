<script setup lang="ts">
import { TopicBase } from "@/models/Topic";

defineProps<{ topics: TopicBase[] }>()

</script>

<template>
    <div class="container-lg" v-once>
        <NuxtLink class="outline-off2 route summary"
            :to="'/topics/' + topic.slug" v-for="topic of topics"
            :key="topic.slug">
            <div class="card col pointer shadow border-x my-3 py-2">
                <strong class="card-title mb-1 upper-first"> {{ topic.name }}
                </strong>
                <div
                    class="d-flex justify-content-between col-gap-1 summary-details">
                    <ClientOnly>
                        <small>{{ topic.authorUsername.asTitle() }}</small>
                        <small>{{ topic.time.asTime().split("at")[0] }}</small>
                    </ClientOnly>
                    <small>Likes: {{ topic.likes }}</small>
                </div>
            </div>
        </NuxtLink>
    </div>
</template>

<style>
.summary:not(:hover):not(:focus) .summary-details {
    font-size: smaller;
}
</style>
