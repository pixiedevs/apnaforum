<script setup lang="ts">
import Like from "@/components/Like.vue";

import { Topic } from "@/models/Topic"

import { copyTextWithMsg, getFullPath } from "@/helpers/dom";
import { markToHtml } from "@/helpers/input";
import { deleteTopic } from "@/helpers/topicServices";

const { topic } = defineProps<{ topic: Topic, commentsCount: number }>()

const authUser = useAuthUser()
let convert = ref(false)

onMounted(() => {
    convert.value = true
})

</script>

<template>
    <div class="topic-view">
        <ClientOnly>
            <div class="cont-menu shadow">
                <div>
                    <button class='button button-clear row'
                        @click="copyTextWithMsg(getFullPath(), 'Link copied to clipboard')">Copy
                        Link</button>
                    <ButtonIfAuth class='button button-clear row'>Report
                    </ButtonIfAuth>
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
        </ClientOnly>
        <div class="row">
            <AvatarImg :name="topic.authorUsername"
                :alt="topic.authorUsername + '\' avatar'" v-once />
            <div class="card-body flex-fill">
                <NuxtLink class="route" :to="`/u/${topic.authorUsername}/`">
                    <span class="card-author">{{ topic.authorUsername }}</span>
                </NuxtLink>
                <div class="card-text md-html"
                    v-html="convert ? markToHtml(topic.body) : '\'' + topic.body + '\''">
                </div>
            </div>
        </div>
        <ClientOnly>
            <div class="interaction m-5">
                <div>
                    <Like :isLiked="topic.isLiked" :toId="topic.slug"
                        :count="topic.likes" />
                </div>
                <div>
                    <span>{{ commentsCount }}
                        {{ 'Comment' + (commentsCount > 1 ? 's' : '') }} </span>
                </div>
            </div>
        </ClientOnly>
    </div>
</template>
