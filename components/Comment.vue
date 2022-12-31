<script setup lang="ts">
import ReplyComponent from "@/components/Reply.vue"
import ButtonIfAuth from "@/components/ButtonIfAuth.vue"
import ButtonIfAuthor from "@/components/ButtonIfAuthor.vue"

import Comment from "@/models/Comment"

import { markToHtml } from "@/helpers/input";
import { copyTextWithMsg, getFullPath } from "@/helpers/dom";
import { deleteComment } from "@/helpers/topicServices";

const { comment, replyCallback, topicIsActive } = defineProps<{
    comment: Comment,
    replyCallback: Function,
    author: string,
    topicIsActive: boolean,
    markUserful: Function
}>()

const doCallback = () => {
    replyCallback(comment.id.toString(), 'comment', comment.body.substring(0, 50))
}

</script>

<template>
    <div class="card comment m-2" :id="'comment-' + comment.id">
        <div class="cont-menu shadow">
            <div>
                <ButtonIfAuth class='button button-clear row'
                    @click="doCallback()" v-if="topicIsActive">Reply
                </ButtonIfAuth>
                <button class='button button-clear row'
                    @click="copyTextWithMsg(getFullPath() + '#comment-' + comment.id, 'Link copied to clipboard')">Copy
                    Link</button>
                <button class='button button-clear row'>Report</button>
                <ButtonIfAuthor class='button button-clear row' :author="author"
                    @click="markUserful(comment.id)">Useful</ButtonIfAuthor>
                <ButtonIfAuthor class='button button-clear row'
                    :author="comment.authorUsername"
                    @click="deleteComment(comment.id)">Delete</ButtonIfAuthor>
            </div>
        </div>
        <div class="row">
            <img src="~/assets/icons/user.svg" alt="author" loading="lazy" />
            <div class="card-body flex-fill mb-5">
                <div class="card-text md-html mt-2"
                    v-html="markToHtml(comment.body)"></div>
                <hr class="small" />

                <small class="card-details pe-4">
                    <NuxtLink class="route"
                        :to="`/u/${comment.authorUsername}/`">
                        <span
                            class="card-author px-3">{{ comment.authorUsername }}</span>
                    </NuxtLink>
                    <span class="card-time">{{ comment.time.asTime() }}</span>
                </small>
            </div>
        </div>

        <ReplyComponent v-for="reply in comment.replies" :key="reply.id"
            :reply="reply" :replyCallback="replyCallback"
            :topicIsActive="topicIsActive" />
    </div>
</template>