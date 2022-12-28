<script setup lang="ts">
import { nativeFetch } from '@/helpers/api';
// import { showToast } from '@/helpers/appState';


const authUser = useAuthUser()

const { isLiked, to, toId, count } = defineProps<{ isLiked: boolean, to: string, toId: string, count: number }>()

const likeModel = ref<boolean>(isLiked)
const likeCount = ref<number>(count)

const doLike = () => {

    nativeFetch(`api/action/`, { query: `&action=like&to=${to}&id=${toId}`, method: likeModel.value ? 'DELETE' : 'GET', auth: true })
        .then((res) => res.json())
        .then((data) => {
            if (data.message.tag === 'success') {
                // showToast(`Like ${likeModel.value ? 'removed' : 'added'}`, data.message.tag, 5000)

                setTimeout(() => {
                    likeCount.value = data.count
                }, 500);
            } else {
                // showToast(data.message, data.message.tag)
                throw new Error(data.message.desc)
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
    <input type="checkbox" v-model="likeModel" @click="doLike()"
        :id="to + '-like'" class='hidden' :disabled="!authUser.auth" />
    <label class='heart' :for="to + '-like'"></label>
    <span v-if="count"> {{ likeCount }} likes </span>
</template>
