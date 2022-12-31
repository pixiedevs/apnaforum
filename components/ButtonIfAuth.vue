<script setup>
const authUser = useAuthUser()

</script>

<template>
    <button
        v-if="authUser.auth">
        <slot />
    </button>
</template>
