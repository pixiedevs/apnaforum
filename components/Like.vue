<script setup lang="ts">
import { voteService } from '@/helpers/topicServices';

const { isLiked, toId, count } = defineProps<{ isLiked: boolean, toId: string, count: number }>()

const authUser = useAuthUser()
const likeModel = ref<boolean>(isLiked)
const likeCount = ref<number>(count)

const doLike = () => {
    voteService("like", "topic", toId, likeModel.value, (c: number) => {
        likeCount.value = c
    }, () => { likeModel.value = !likeModel.value })
}
</script>

<template>
    <input type="checkbox" v-model="likeModel" @click="doLike()" id="topic-like"
        class='hidden' v-if="authUser.auth" />
    <label class='heart me-3' for="topic-like"></label>
    <span v-if="count"> {{ likeCount }} likes </span>
</template>

<style scoped>
.heart {
    --icn-sizeh: 1.5rem;
    position: relative;
    cursor: pointer;
    width: calc(var(--icn-sizeh) * 2);
    height: calc(var(--icn-sizeh) * 1.8);
    float: left;
}

input:checked~.heart:before,
input:checked~.heart:after {
    background: #fc2e5a;
}

.heart:before,
.heart:after {
    border-top: 2px solid white;
    position: absolute;
    content: "";
    left: var(--icn-sizeh);
    top: 0;
    width: var(--icn-sizeh);
    height: calc(var(--icn-sizeh) * 1.6);
    -moz-border-radius: var(--icn-sizeh) var(--icn-sizeh) 0 0;
    border-radius: var(--icn-sizeh) var(--icn-sizeh) 0 0;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-transform-origin: 0 100%;
    -moz-transform-origin: 0 100%;
    -ms-transform-origin: 0 100%;
    -o-transform-origin: 0 100%;
    transform-origin: 0 100%;
}

.heart:before {
    border-left: 2px solid white;
}

.heart:after {
    left: 0;
    border-right: 2px solid white;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-transform-origin: 100% 100%;
    -moz-transform-origin: 100% 100%;
    -ms-transform-origin: 100% 100%;
    -o-transform-origin: 100% 100%;
    transform-origin: 100% 100%;
}
</style>