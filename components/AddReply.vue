<script setup lang="ts">
import { markToHtmlPreview } from '@/helpers/input';
import { addService } from '@/helpers/topicServices';

const replyBody = ref('')
const authUser = useAuthUser()
const replyTo = useState('replyTo')

const { toggleFloat, insertReply } = defineProps<{ insertReply: Function, toggleFloat: Function }>()

const handleSubmit = (event: any) => {
    event.preventDefault()

    if (!authUser.value.auth) {
        return;
    }

    const formData = new FormData(event.target)
    formData.set('comment-id', replyTo.value[0])

    addService("reply", formData, (id) => {
        insertReply({
            id: id,
            authorUsername: authUser.value.username,
            body: replyBody.value,
            likes: 0,
            time: new Date().toString(),
            reply_of: { id: replyTo.value[0], username: '' }
        })
        replyBody.value = '';
        toggleFloat()
    })
}

</script>

<template>
    <form @submit.prevent="handleSubmit" class='strict'>
        <div id="add-reply" class="card col mt-5 py-3 card-bg">
            <label for="editor-add-reply">Add Reply</label>
            <small>{{ `Reply to  ${replyTo[1]} - ${replyTo[2]}` }}</small>
            <div class="editor-menu"></div>

            <textarea name="reply-body" id="editor-add-reply"
                v-model="replyBody" minlength="10" required></textarea>

            <button type='submit' class="button">submit</button>
            <button type="button" @click="toggleFloat()">cancel</button>
            <div class="card flex-column reply empty-not-outline my-3"
                id="editorPreview-add-reply"
                v-html="markToHtmlPreview(replyBody ?? '')"></div>
        </div>
    </form>

</template>
