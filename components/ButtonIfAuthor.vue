<script setup lang="ts">
defineProps<{ author: string }>()
const authUser = useAuthUser()

</script>

<template>
    <button
        v-if="authUser.username == author || authUser.isa.includes('moderator')">
        <slot />
    </button>
</template>
