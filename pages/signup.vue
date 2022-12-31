<script setup>

import { usePostFetch } from '@/helpers/api';
import { showToast, startLoading, stopLoading } from '@/helpers/appState';

useHead({
    title: 'SignUp'
})

const router = useRouter()

const handleSignUp = (e) => {
    const formData = new FormData(e.target)

    if (formData.get('username').length < 7) {
        showToast("Username must be more or equal to 7 letters.", "warning", 5000)
        return
    } else if (formData.get('password').length < 8) {
        showToast("Password must be more or equal to 8 letters.", "warning", 5000)
        return
    } else if (formData.get('password') !== formData.get('password__confirm')) {
        showToast("Password and confirm password are not same!", "warning", 5000)
        return
    }

    startLoading(2000)
    usePostFetch(`/api/signup/`, formData, 'POST')
        .then((res) => res.json())
        .then((data) => {
            if (data.message) {
                showToast(data.message.desc, data.message.tag, 5000)
                stopLoading()
            } else {
                throw new Error("")
            }
        })
        .catch((err) => {
            showToast("Unable to SignUp! try changing username or password.", "error", 5000)
        })
}

</script>

<template>
    <div class="page">

        <div class="heading text-center">
            <h1>SignUp</h1>
        </div>

        <div id="signup" class="card-bg rounded shadow py-5 px-2 pb-0 m-auto">
            <form @submit.prevent="handleSignUp">
                <div class="container">
                    <label>Email: <input type="email" name='email'
                            required /></label>
                    <label>First Name: <input type="text" name='first-name'
                            required /></label>
                    <label>Last Name: <input type="text"
                            name='last-name' /></label>
                    <label>Username: <input type="text" name='username'
                            required /></label>
                    <label>Password: <input type="password" name='password'
                            required /></label>
                    <label>Password: <input type="password"
                            name='password__confirm' required /></label>

                    <div class="d-flex justify-content-around">
                        <button class="small" type='submit'>SignUp</button>
                        <button class="small" type="button"
                            @click="router.back()">Cancel</button>
                    </div>
                    <details>
                        <summary class="editor-help pointer">Info
                        </summary>
                        <p>
                            Currently your account will activated but you have
                            to
                            confirm you email from profile page.
                        </p>
                    </details>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
#signup {
    width: clamp(250px, 600px, 95vw);
}
</style>
