<script setup lang="ts">
defineProps<{ author: string, moderator?: boolean }>()
const authUser = useAuthUser()

</script>

<template>
    <button
        v-if="authUser.username == author || (moderator && authUser.isa.includes('moderator'))">
        <slot />
    </button>
</template>
