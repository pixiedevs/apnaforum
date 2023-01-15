<script setup lang="ts">
import { markToHtmlPreview } from "@/helpers/input";
import { addService } from "@/helpers/topicServices";

const commentBody = ref('')
const authUser = useAuthUser()

const { slug, insertComment } = defineProps<{ slug: string, insertComment: Function }>()

const handleSubmit = (event: any) => {
    event.preventDefault()

    if (!authUser.value.auth) {
        return;
    }

    const formData = new FormData(event.target)
    formData.set('topic-id', slug)

    addService("comment", formData, (id) => {
        insertComment({
            id: id,
            authorName: '',
            authorUsername: authUser.value.username,
            body: commentBody.value,
            likes: 0,
            repliesCount: 0,
            replies: [],
            time: new Date().toString(),
        })
        commentBody.value = '';
    })
}

</script>

<template>
    <form @submit.prevent="handleSubmit" class='strict'>
        <div id="add-comment" class="card col mt-5 py-3">
            <label for="editor-add-comment">Add Comment</label>
            <div class="editor-menu"></div>

            <textarea name="comment-body" id="editor-add-comment"
                v-model="commentBody" minlength="10" required></textarea>

            <button type='submit' class="button">submit</button>

            <div class="card comment empty-not-outline"
                id="editorPreview-add-comment"
                v-html="markToHtmlPreview(commentBody ?? '')"></div>
        </div>
    </form>

</template>
