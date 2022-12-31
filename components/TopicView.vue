<script setup lang="ts">
import Like from "@/components/Like.vue";

import { Topic } from "@/models/Topic"

import { copyTextWithMsg, getFullPath } from "@/helpers/dom";
import { markToHtml } from "@/helpers/input";
import { deleteTopic } from "@/helpers/topicServices";

const { topic } = defineProps<{ topic: Topic, commentsCount: number }>()

const authUser = useAuthUser()

const vMdToHtml = {
    created(el, binding) {
        el.innerHTML = binding.value;
    },
    mounted(el, binding) {
        el.innerHTML = markToHtml(binding.value);
    }
}

</script>

<template>
    <div class="topic-view">
        <div class="cont-menu shadow">
            <div>
                <button class='button button-clear row'
                    @click="copyTextWithMsg(getFullPath(), 'Link copied to clipboard')">Copy
                    Link</button>
                <button class='button button-clear row'>Report</button>
                <button class='button button-clear row'
                    v-if="authUser.username == topic.authorUsername || ['moderator', 'staff', 'admin'].includes(authUser.isa)"
                    @click="deleteTopic(topic.slug)">Delete</button>
                <NuxtLink class="route"
                    :to="'/update-topic/?topic=' + topic.slug">
                    <button class='button button-clear row'
                        v-if="authUser.username == topic.authorUsername">Edit</button>
                </NuxtLink>
            </div>
        </div>
        <div class="row">
            <img src="~/assets/icons/user.svg" alt="author" />
            <div class="card-body flex-fill">
                <NuxtLink class="route" :to="`/u/${topic.authorUsername}/`">
                    <span class="card-author">{{ topic.authorUsername }}</span>
                </NuxtLink>
                <div class="card-text md-html" v-md-to-html="topic.body" v-once>
                </div>
            </div>
        </div>
        <div class="interaction mx-5">
            <div>
                <Like :isLiked="topic.isLiked" :toId="topic.slug"
                    :count="topic.likes" />
            </div>
            <div>
                <span>{{ commentsCount }} Comments</span>
            </div>
        </div>
    </div>
</template>
