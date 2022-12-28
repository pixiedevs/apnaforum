<script setup lang="ts">
import { Topic } from "@/models/Topic"
import LikeComponent from "@/components/LikeComponent.vue";
import { copyTextWithMsg, getFullPath } from "@/helpers/dom";
import { markToHtml } from "@/helpers/input";
import { nativeFetch } from "@/helpers/api";
import { showToast } from "@/helpers/appState";

const { topic } = defineProps<{ topic: Topic }>()

const authUser = useAuthUser()

const vMdToHtml = {
    mounted(el, binding) {
        el.innerHTML = markToHtml(binding.value);
    }
}

const deleteTopic = () => {
    nativeFetch('/api/topics/delete', { query: `&topic-slug=${topic.slug}`, method: 'DELETE', auth: true })
        .then((res) => res.json())
        .then((data) => {
            if (data.message) {
                showToast(data.message.desc, data.message.tag, 5000)
                if (data.message.tag === "success") {
                    useRouter().back()
                }
            }
        }).catch((err) => {
            console.log(err);
        });
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
                    @click="showToast('Are you sure to delete this topic?', 'warning', 10000, [{ name: 'DELETE', do: deleteTopic }])">Delete</button>
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
                    {{ topic.body }}
                </div>
            </div>
        </div>
        <div class="interaction mx-3">
            <div>
                <LikeComponent :isLiked="topic.isLiked" :toId="topic.slug"
                    :count="topic.likes" />
            </div>
        </div>
    </div>
</template>
