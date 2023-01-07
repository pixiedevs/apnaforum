<script setup lang="ts">
import { nativeFetch } from "@/helpers/api";
import { getPersistData, setPersistData } from "@/helpers/cookie";
import Comment from "@/models/Comment";

const comments = ref<Comment[]>([])

onMounted(() => {
    if (getPersistData('comments-latest')) {
        comments.value = getPersistData('comments-latest')
    } else {
        nativeFetch<{ comments: Comment[] }>('/comments-latest/')
            .then((data) => {
                comments.value = data.comments
                setPersistData('comments-latest', data.comments)

            })
            .catch((err) => { })
    }
})

</script>

<template>
    <div class="d-flex flex-column" v-if="comments.length > 0">
        <strong>New Comments: -</strong>
        <NuxtLink class="outline-off2 route" v-for="comment of comments"
            :key="comment.id" v-once>
            <strong class="row shadow border-x pointer my-3 p-1 ps-2">
                {{ comment.body }}
            </strong>
        </NuxtLink>
    </div>
</template>
