<script setup lang="ts">
import { nativeFetch } from "@/helpers/api";
import { UserShort } from "@/models/User";

const users = ref<UserShort[]>([])

onMounted(() => {
    nativeFetch('/api/users-top/')
        .then((res) => res.json())
        .then((data) => {
            users.value = data.users
            // pendingComments.value = false
        })
        .catch((err) => { })
})

</script>

<template>
    <div class="container" v-if="users.length > 0">
        <strong>Top Users: -</strong>
        <NuxtLink class="route outline-off2" :to="'/u/' + user.username"
            v-for="user of users" :key="user.username" v-once>
            <strong class="row shadow border-x pointer my-2 p-1 ps-2"
                :key="user.username">
                {{ user.username }}
            </strong>
        </NuxtLink>
    </div>
</template>
