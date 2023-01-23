<script setup>

import { updateAuthUser, usePostFetch } from '@/helpers/api';
import { showToast, startLoading, stopLoading } from '@/helpers/appState';
import { setCookieValue } from '@/helpers/cookie';

useHead({
    title: 'Login'
})

const router = useRouter()

const handleLogin = (e) => {
    const formData = new FormData(e.target)

    startLoading(2)
    usePostFetch(`/token/`, formData, 'POST', false)
        .then((data) => {
            if (data.access) {
                setCookieValue("sessiona", data.access, 5)
                setCookieValue("sessionr", data.refresh, 6)
                updateAuthUser()
                showToast("You successfully logged in.", "success", 5)
                stopLoading()
                router.back()
            } else {
                throw new Error()
            }
        })
        .catch(() => {
            showToast("Wrong username or password!", "error", 5)
        })
}

</script>

<template>
    <div class="page">

        <div class="heading text-center">
            <h1>Login</h1>
        </div>

        <div id="login" class="rounded px-2 pb-0 m-auto">

            <form @submit.prevent="handleLogin">
                <div class="container">
                    <div class="text-center">
                        <img src="/icons/login.svg" class="medium"
                            alt="login image" loading="lazy">
                    </div>
                    <label>Username: <input type="text" name='username'
                            required /></label>
                    <label>Password: <input type="password" name='password'
                            required /></label>

                    <div class="d-flex justify-content-around flex-wrap">
                        <button type='submit'>Login</button>
                        <button type="button"
                            @click="router.back()">Cancel</button>
                    </div>
                    <p class="text-center mt-3">* Create Account *</p>
                    <div class="text-center mt-3">
                        <NuxtLink :to="'/signup/'"><button
                                type="button">Signup</button></NuxtLink>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
#login {
    width: clamp(250px, 600px, 95vw);
}
</style>