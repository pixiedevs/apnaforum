<script setup>
import { handleLogout } from '@/helpers/api';
import { showToast, startLoading, stopLoading } from '@/helpers/appState';


useHead({
    title: 'Logout'
})

const router = useRouter()


onMounted(() => {
    startLoading(2)
    handleLogout()
    showToast("You successfully logged out.", "success")
    stopLoading()
    setTimeout(() => {
        router.isReady()
            .then((res) => {
                router.back()
            });
    }, 1000);
})

</script>

<template>
    <div class="page">
        <div class="container text-center">
            <h1>Logged out successfully</h1>
        </div>
    </div>
</template>
