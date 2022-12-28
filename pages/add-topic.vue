<script setup lang="ts">
import { usePostFetch } from "@/helpers/api";
import { markToHtmlPreview } from "@/helpers/input";
import { showToast } from "@/helpers/appState";

const topicBody = ref('')

useHead({
    title: 'Add Topic'
})
definePageMeta({
    middleware: ['auth']
})

const handleAddTopic = (e: FormDataEvent) => {
    let form = new FormData(e.target as HTMLFormElement)
    usePostFetch('api/topics/add/', form)
        .then((res) => { console.log(res.status); return res.json() }).then((data) => {
            console.log(data);

            if (data.message) {
                showToast(data.message.desc, data.message.tag, 0, data.slug ? [{ name: 'open', do: () => { navigateTo('/topics/' + data.slug) } }] : null)
            }
            else
                throw new Error("")
        })
        .catch((err) => {
            showToast("Unable to add topic!", "error", 5000)
        })
}

</script>

<template>
    <div class='page'>
        <div class="heading text-center">
            <h1>Add Topic</h1>
        </div>
        <!-- <ClientOnly fallbackTag="span"> -->
        <!-- <template #fallback>
                <p>Loading components...</p>
            </template> -->


        <form class="strict" @submit.prevent="handleAddTopic">
            <div class="container">

                <label for="add-topic-name">Name: </label>
                <input type="text" name="topic-name" id="add-topic-name"
                    placeholder="Topic Name" maxlength="140" minlength="10"
                    required>
                <label for="add-topic-forum">Forum: </label>
                <input type="text" name="topic-forum" id="add-topic-forum"
                    pattern="^[A-Za-z]+" maxlength="50" minlength="3"
                    placeholder="Topic Forum, default: general(general, coding, programming, versus, college)"
                    title="Forum name contains alphabets only and must be 3 to 50 char long.">
                <label for="add-topic-body"
                    class="d-flex justify-content-between">
                    <strong>Content:</strong>
                    <div class="editor-details">
                        <small v-if="topicBody !== ''">Words:
                            {{ topicBody.split(/\s+/g).length }}</small>
                    </div>
                </label>
                <textarea name="topic-body" v-model="topicBody" class="mb-0"
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
                    v-html="markToHtmlPreview(topicBody ?? '')"></div>
            </div>
        </form>
        <!-- </ClientOnly> -->
    </div>
</template>
