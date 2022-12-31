<script setup lang="ts">
import { usePostFetch } from '@/helpers/api';
import { showToast } from '@/helpers/appState';
import { markToHtmlPreview } from '@/helpers/input';

const replyBody = ref('')
const authUser = useAuthUser()
const replyTo = useState('replyTo')

const { refreshComments } = defineProps<{ refreshComments: Function }>()

const handleSubmit = (event: any) => {
    event.preventDefault()

    if (!authUser.value.auth) {
        return;
    }

    const formData = new FormData(event.target)
    formData.set('comment-id', replyTo.value[0])

    usePostFetch('api/reply/add/', formData)
        .then((res) => res.json())
        .then((data) => {

            if (data.message.tag === "success") {
                replyBody.value = ''
                refreshComments()
                setTimeout(() => {
                    document.getElementById('reply-'+data["reply-id"]).scrollIntoView(true)
                }, 500);
                showToast("Reply added.", "success", 5000)

            }
            else throw new Error("")
        }).catch((err) => {
            console.log(err);
            showToast("Unable to add reply!", "error", 5000)
        })
}

</script>

<template>
    <form @submit.prevent="handleSubmit" class='strict'>
        <div id="add-reply" class="card col mt-5 py-3 card-bg">
            <label for="editor-add-reply">Add Reply</label>
                <small>{{`Reply to  ${replyTo[1]} - ${replyTo[2]}`}}</small>
                <div class="editor-menu"></div>

            <textarea name="reply-body" id="editor-add-reply"
                v-model="replyBody" required></textarea>

            <button type='submit' class="button">submit</button>

            <div class="card reply empty-not-outline"
                id="editorPreview-add-reply"
                v-html="markToHtmlPreview(replyBody ?? '')"></div>
        </div>
    </form>

</template>
