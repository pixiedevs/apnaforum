<script setup lang="ts">
import ReplyComponent from "@/components/Reply.vue"
import ButtonIfAuth from "@/components/ButtonIfAuth.vue"
import ButtonIfAuthor from "@/components/ButtonIfAuthor.vue"

import Comment from "@/models/Comment"

import { markToHtml } from "@/helpers/input";
import { copyTextWithMsg, getFullPath } from "@/helpers/dom";
import { deleteComment } from "@/helpers/topicServices";

const { comment, replyCallback, topicIsActive } = defineProps<{
    index: number,
    comment: Comment,
    replyCallback: Function,
    author: string,
    topicIsActive: boolean,
    markUserful: Function,
    moreReplies: Function
}>()

const doCallback = () => {
    replyCallback(comment.id.toString(), 'comment', comment.body.substring(0, 50), comment.id)
}

</script>

<template>
    <div class="card comment m-2" :id="'comment-' + comment.id">
        <div class="cont-menu shadow">
            <div>
                <ButtonIfAuth class='button button-clear row'
                    @click="doCallback()" v-if="topicIsActive">Reply
                </ButtonIfAuth>
                <button class='button button-clear row' @click="copyTextWithMsg(getFullPath() + '#comment-' + comment.id,
                'Link copied to clipboard')">Copy Link</button>
                <ButtonIfAuth class='button button-clear row'>Report
                </ButtonIfAuth>
                <ButtonIfAuthor class='button button-clear row useful'
                    :author="author" @click="markUserful(comment.id)">Useful
                </ButtonIfAuthor>
                <ButtonIfAuthor class='button button-clear row'
                    v-if="comment.body !== '[DELETED]'"
                    :author="comment.authorUsername" :moderator="true"
                    @click="deleteComment(comment.id)">Delete</ButtonIfAuthor>
            </div>
        </div>
        <div class="row">
            <AvatarImg :name="comment.authorUsername"
                :alt="comment.authorUsername + '\' avatar'" v-once />
            <div class="card-body flex-fill mb-5">
                <div class="card-text md-html mt-2"
                    v-html="markToHtml(comment.body)"></div>
                <hr class="small" />

                <small class="card-details pe-4">

                    <span class="card-author px-3">{{ comment.repliesCount }}
                        replies</span>
                    <NuxtLink :to="`/u/${comment.authorUsername}/`">
                        <span
                            class="card-author px-3">{{ comment.authorUsername }}</span>
                    </NuxtLink>
                    <span class="card-time">{{ comment.time.asTime() }}</span>
                </small>
            </div>
        </div>

        <ReplyComponent v-for="reply in comment.replies" :key="reply.id"
            :reply="reply" :replyCallback="replyCallback"
            :topicIsActive="topicIsActive" :commentId="comment.id" />

        <button v-if="comment.repliesCount != comment.replies?.length"
            class="button-clear small ms-auto mb-2"
            title="Currently this option isn't available."
            @click="moreReplies(null, true, comment.id, index)">Load
            more</button>

    </div>
</template>
