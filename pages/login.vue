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

    startLoading(2000)
    usePostFetch(`/api/token/`, formData, 'POST')
        .then((res) => res.json())
        .then((data) => {
            setCookieValue("sessiona", data.access, 5)
            setCookieValue("sessionr", data.refresh, 6)
            updateAuthUser()
            showToast("You successfully logged in.", "success", 5000)
            stopLoading()
            router.back()
        })
        .catch((err) => {
            showToast("Wrong username or password!", "error", 5000)
        })
}

</script>

<template>
    <div class="page">

        <div id="login" class="card-bg rounded shadow py-5 px-2 pb-0 m-auto">
            <form @submit.prevent="handleLogin">
                <div class="container">
                    <label>Username: <input type="text"
                            name='username' /></label>
                    <label>Password: <input type="password"
                            name='password' /></label>

                    <input type="checkbox" name='day1' class="fancy"
                        id="login-day" />
                    <label for="login-day">Only 1 day</label>

                    <div class="d-flex justify-content-around">
                        <button class="small" type='submit'>Login</button>
                        <button class="small" type="button"
                            @click="router.back()">Cancel</button>
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