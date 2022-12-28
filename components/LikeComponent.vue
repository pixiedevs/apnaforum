<script setup lang="ts">
import { nativeFetch } from '@/helpers/api';
import { showToast } from '@/helpers/appState';


const authUser = useAuthUser()

const { isLiked, toId, count } = defineProps<{ isLiked: boolean, toId: string, count: number }>()

const likeModel = ref<boolean>(isLiked)
const likeCount = ref<number>(count)

const doLike = () => {

    nativeFetch(`api/vote/`, { query: `&action=like&to=topic&id=${toId}`, method: likeModel.value ? 'DELETE' : 'GET', auth: true })
        .then((res) => res.json())
        .then((data) => {
            if (data.message.tag === 'success') {
                showToast(`Like ${likeModel.value ? 'added' : 'removed'}`, data.message.tag, 5000)

                setTimeout(() => {
                    likeCount.value = data.count
                }, 500);
            } else {
                if (data.message)
                    showToast(data.message.desc, data.message.tag)
                throw new Error("")
            }
        })
        .catch((err: Error) => {
            setTimeout(() => {
                likeModel.value = !likeModel.value
            }, 500)
        }
        )
}

</script>

<template>
    <input type="checkbox" v-model="likeModel" @click="doLike()" id="topic-like"
        class='hidden' :disabled="!authUser.auth" />
    <label class='heart' for="topic-like"></label>
    <span v-if="count"> {{ likeCount }} likes </span>
</template>
