<script setup lang="ts">
import ButtonIfAuth from "@/components/ButtonIfAuth.vue"
import ButtonIfAuthor from "@/components/ButtonIfAuthor.vue"

import Reply from "@/models/Reply"

import { copyTextWithMsg, getFullPath } from "@/helpers/dom";
import { markToHtml } from "@/helpers/input";
import { deleteReply } from "@/helpers/topicServices";

const { reply, replyCallback, topicIsActive, commentId } = defineProps<{
    reply: Reply,
    commentId: number,
    replyCallback: Function,
    topicIsActive: boolean
}>()


const doCallback = () => {
    replyCallback(reply.id.toString(), 'reply', reply.body.substring(0, 50), commentId)
}

</script>

<template>
    <div class="card reply m-2" :id="'reply-' + reply.id">
        <div class="cont-menu shadow">
            <div>
                <ButtonIfAuth class='button button-clear row'
                    @click="doCallback()" v-if="topicIsActive">Reply
                </ButtonIfAuth>
                <button class='button button-clear row'
                    @click="copyTextWithMsg(getFullPath() + '#reply-' + reply.id, 'Link copied to clipboard')">Copy
                    Link</button>
                <ButtonIfAuth class='button button-clear row'>Report</ButtonIfAuth>
                <ButtonIfAuthor class='button button-clear row'
                    :author="reply.authorUsername" :moderator="true"
                    @click="deleteReply(reply.id)">Delete</ButtonIfAuthor>
                <!-- v-if="reply.body !== '[DELETED]'" -->
            </div>
        </div>
        <div class="row">
            <img src="~/assets/icons/user.svg" alt="author" loading="lazy" />
            <div class="card-body flex-fill mb-5">
                <NuxtLink :to="'#' + reply.reply_of.id">
                    <small class="card-reply_of">Reply to
                        {{ reply.reply_of.username }}</small>
                </NuxtLink>

                <div class="card-text md-html" v-html="markToHtml(reply.body)">
                </div>
                <hr class="small" />

                <small class="card-details pe-4 flex-wrap">
                    <NuxtLink class="route" :to="`/u/${reply.authorUsername}/`">
                        <span
                            class="card-author">{{ reply.authorUsername }}</span>
                    </NuxtLink>
                    <span class="card-time">{{ reply.time.asTime() }}</span>
                </small>
            </div>
        </div>

    </div>
</template>
