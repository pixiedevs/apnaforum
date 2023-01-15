<script setup lang="ts">
import { nativeFetch, usePostFetch } from "@/helpers/api";
import { markToHtmlPreview } from "@/helpers/input";
import { showToast } from "@/helpers/appState";
import { Topic } from "@/models/Topic";

useHead({
    title: 'Update Topic'
})

definePageMeta({
    middleware: ['auth']
})

const topic = ref<Topic>()
const router = useRouter()

onMounted(() => {
    let slug = useRoute().query.topic
    if (slug) {
        nativeFetch<{ topic: Topic }>(`/topics/${slug}/`)
            .then((data) => {
                if (data.topic && data.topic.authorUsername == useAuthUser().value.username) {
                    topic.value = data.topic
                } else {
                    showToast("Unable to find topic or it's not created by you!", "error", 5)
                    setTimeout(() => {
                        router.back()
                    }, 1000);
                }
            })
    }
})


const handleAddTopic = (e: FormDataEvent) => {
    let form = new FormData(e.target as HTMLFormElement)
    usePostFetch('/topics/update/', form)
        .then((data) => {
            if (data.message) {
                showToast(data.message.desc, data.message.tag, 0, data.slug ? [{ name: 'open', do: () => { navigateTo('/topics/' + data.slug) } }] : null)
            }
            else
                throw new Error()
        })
        .catch((err) => {
            showToast("Unable to update topic!", "error", 5)
        })
}

</script>

<template>
    <div class='page'>
        <div class="heading text-center">
            <h1>Update Topic</h1>
        </div>
        <!-- <ClientOnly fallbackTag="span"> -->
        <!-- <template #fallback>
                <p>Loading components...</p>
            </template> -->


        <form class="strict" @submit.prevent="handleAddTopic" v-if="topic">
            <div class="container">

                <label for="add-topic-name">Name: </label>
                <input type="text" name="topic-name" id="add-topic-name"
                    placeholder="Topic Name" maxlength="140" minlength="10"
                    :value="topic.name" required>
                <label for="add-topic-forum">Forum: </label>
                <input type="text" name="topic-forum" id="add-topic-forum"
                    pattern="^[A-Za-z]+" maxlength="50" minlength="3"
                    :value="topic.forumData.name"
                    placeholder="Topic Forum, default: general(general, coding, programming, versus, college)"
                    title="Forum name contains alphabets only and must be 3 to 50 char long.">
                <label for="add-topic-body"
                    class="d-flex justify-content-between">
                    <strong>Content:</strong>
                    <div class="editor-details">
                        <small v-if="topic.body !== ''">Words:
                            {{ topic.body.split(/\s+/g).length }}</small>
                    </div>
                </label>
                <textarea name="topic-body" v-model="topic.body" class="mb-0"
                    id="add-topic-body" minlength="50" required></textarea>
                <details>
                    <summary class="editor-help pointer">Help
                    </summary>
                    <p>
                    <ul>
                        <li>use 3 ('`') for code/output
                            Example: ```
                            your code```</li>
                    </ul>
                    </p>
                </details>
                <div class="card col">
                    <button type='submit' class="button">submit</button>
                </div>

                <div class="empty-not-outline" id="editorPreview-add-topic"
                    v-html="markToHtmlPreview(topic.body ?? '')"></div>
            </div>
        </form>
        <!-- </ClientOnly> -->
    </div>
</template>
