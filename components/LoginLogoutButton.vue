<script setup>
const authUser = useAuthUser()

</script>

<template>
    <button v-if="authUser.auth" class="small toggler"
        @click="navigateTo('/logout/')"
        title="Log out to the current session.">Logout</button>
    <button v-else class="small toggler" @click="navigateTo('/login/')"
        title="Show Login Page">Login</button>
</template>
