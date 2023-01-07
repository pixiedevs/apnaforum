<script setup lang="ts">
import { nativeFetch } from "@/helpers/api";
import { getPersistData, setPersistData } from "@/helpers/cookie";
import { UserShort } from "@/models/User";

const users = ref<UserShort[]>([])

onMounted(() => {
    if (getPersistData('users-top')) {
        users.value = getPersistData('users-top')
    } else {
        nativeFetch<{ users: UserShort[] }>('/users-top/')
            .then((data) => {
                users.value = data.users
                setPersistData('users-top', data.users)

            })
            .catch((err) => { })
    }
})

</script>

<template>
    <div class="d-flex flex-column" v-if="users.length > 0">
        <strong>Top Users: -</strong>
        <NuxtLink class="outline-off2 route button button-outline"
            :to="'/u/' + user.username" v-for="user of users"
            :key="user.username" v-once>
            {{ user.username }}
        </NuxtLink>
    </div>
</template>
