<script setup lang="ts">
import { copyTextWithMsg, getFullPath } from "@/helpers/dom";
import { markToHtml } from "@/helpers/input";
import Comment from "@/models/Comment"
import ReplyComponent from "@/components/ReplyComponent.vue"
import { nativeFetch } from "@/helpers/api";
import { showToast } from "@/helpers/appState";

const authUser = useAuthUser()

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
const deleteComment = () => {
    nativeFetch('/api/1comments/delete', { query: `&comment-id=${comment.id}`, method: 'DELETE', auth: true })
        .then((res) => res.json())
        .then((data) => {
            if (data.message) {
                showToast(data.message.desc, data.message.tag, 5000)
            }
        }).catch((err) => {
            // console.log(err);
            showToast("Unable to delete comment!", "error", 5000)
        });
}

</script>

<template>
    <div class="card comment m-2" :id="'comment-' + comment.id">
        <div class="cont-menu shadow">
            <div>
                <button class='button button-clear row' @click="doCallback()"
                    :disabled="!topicIsActive">Reply</button>
                <button class='button button-clear row'
                    @click="copyTextWithMsg(getFullPath() + '#comment-' + comment.id, 'Link copied to clipboard')">Copy
                    Link</button>
                <button class='button button-clear row'>Report</button>
                <button class='button button-clear row'
                    v-if="authUser.auth && authUser.username == author"
                    @click="markUserful(comment.id)">Useful</button>
                <button class='button button-clear row'
                    v-if="authUser.username == comment.authorUsername || ['moderator', 'staff', 'admin'].includes(authUser.isa)"
                    @click="showToast('Are you sure to delete this comment?', 'warning', 10000, [{ name: 'DELETE', do: deleteComment }])">Delete</button>
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
