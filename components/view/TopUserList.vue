<script setup lang="ts">
import { nativeFetch } from "@/helpers/api";
import { getPersistData, setPersistData } from "@/helpers/cookie";
import { UserShort } from "@/models/User";

const users = ref<UserShort[]>([])

onMounted(() => {
    if (getPersistData('users-top')) {
        users.value = getPersistData('users-top')
    } else {
            nativeFetch('/api/users-top/')
        .then((res) => res.json())
        .then((data) => {
            users.value = data.users
            setPersistData('users-top', data.users)

        })
        .catch((err) => { })
    }
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
