<template>
    <div>

        <div class="p-2" v-if="authUser.auth">
            <div>
                User: <strong>{{ authUser.username }}</strong>
            </div>
            <div v-if="authUser.isa !== 'user'">
                <small>Type: </small><strong>{{ authUser.isa }}</strong>
            </div>
        </div>

        <div class='p-2'>
            <LoginLogoutButton />
        </div>

    </div>
</template>


<script setup lang="ts">
import LoginLogoutButton from "@/components/LoginLogoutButton.vue"

const authUser = useAuthUser()

</script>
