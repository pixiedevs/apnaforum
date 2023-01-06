<script setup lang="ts">
import { usePostFetch } from "@/helpers/api";
import { markToHtmlPreview } from "@/helpers/input";
import { showToast } from "@/helpers/appState";
import { addService } from "@/helpers/topicServices";

const topicBody = ref('')

useHead({
    title: 'Add Topic'
})
definePageMeta({
    middleware: ['auth']
})

const handleAddTopic = (e) => {
    let form = new FormData(e.target)
    addService("topic", form, () => { })
}

</script>

<template>
    <div class='page'>
        <div class="heading text-center">
            <h1>Add Topic</h1>
        </div>
        <ClientOnly fallbackTag="span">
            <template #fallback>
                <p class="loading loading-center text-center">Loading...</p>
            </template>


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
        </ClientOnly>
    </div>
</template>
