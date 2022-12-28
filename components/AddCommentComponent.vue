<script setup lang="ts">
import { usePostFetch } from "@/helpers/api";
import { showToast } from "@/helpers/appState";
import { markToHtmlPreview } from "@/helpers/input";
const commentBody = ref('')
const authUser = useAuthUser()

const { slug, refreshComments } = defineProps<{ slug: string, refreshComments: Function }>()

const scrollToComment = (id: string) => {
    setTimeout(() => {
        document.getElementById('comment-' + id).scrollIntoView(true)
    }, 500);
}

const handleSubmit = (event: any) => {
    event.preventDefault()

    if (!authUser.value.auth) {
        return;
    }

    const formData = new FormData(event.target)
    formData.set('topic-id', slug)

    usePostFetch('api/comments/add/', formData)
        .then((res) => res.json())
        .then((data) => {

            if (data.message) {
                if (data.message.tag === "success") {
                    commentBody.value = ''
                    refreshComments()
                }
                showToast(data.message.desc, data.message.tag, 5000, data["comment-id"] ? [{ name: 'View', do: () => { scrollToComment(data["comment-id"]) } }] : null)
            }
            else throw new Error("")
        }).catch((err) => {
            console.log(err);
            showToast("Unable to add comment!", "error", 5000)
        })
}

</script>

<template>
    <form @submit.prevent="handleSubmit" class='strict'>
        <div id="add-comment" class="card col mt-5 py-3">
            <label for="editor-add-comment">Add Comment</label>
            <div class="editor-menu"></div>

            <textarea name="comment-body" id="editor-add-comment"
                v-model="commentBody" required></textarea>

            <button type='submit' class="button">submit</button>

            <div class="card comment empty-not-outline"
                id="editorPreview-add-comment"
                v-html="markToHtmlPreview(commentBody ?? '')"></div>
        </div>
    </form>

</template>
