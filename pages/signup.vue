<script setup>
import { usePostFetch } from '@/helpers/api';
import { showToast, startLoading, stopLoading } from '@/helpers/appState';
import { formDataToObj } from '@/helpers/input';

useHead({
    title: 'SignUp'
})

const router = useRouter()
const emailVerify = ref(false)
const otpSent = ref(false)

const handleSignUp = (e) => {
    const form = new FormData(e.target)

    if (emailVerify.value) return handleVerification(form)

    if (form.get('username').length < 5) {
        showToast("Username must be more or equal to 5 letters.", "warning", 5)
        return
    }

    if (form.get('password').length < 8) {
        showToast("Password must be more or equal to 8 letters.", "warning", 5)
        return
    }
    if (form.get('password') !== form.get('password__confirm')) {
        showToast("Password and confirm password are not same!", "warning", 5)
        return
    }

    startLoading(2)
    usePostFetch(`/signup/`, form, 'POST')
        .then((data) => {
            if (data.message) {
                showToast(data.message.desc, data.message.tag, 5)
                if (data.message.tag === 'success') {
                    emailVerify.value = true
                }
                stopLoading()
            } else {
                throw new Error()
            }
        })
        .catch((e) => {
            console.log(e);
            showToast("Unable to SignUp! try changing email, username or password.", "error", 10)
        })
}
const handleVerification = (form) => {
    startLoading(2)
    usePostFetch('/api/email-verify/', form, 'POST')
        .then((data) => {
            if (data.message) {
                showToast(data.message.desc, data.message.tag, 5)
                if (data.message.tag === 'success') {
                    if (otpSent.value) navigateTo('/login/')
                    else
                        otpSent.value = true
                }
                stopLoading()
            } else {
                throw new Error()
            }
        })
        .catch((e) => {
            console.log(e);
            showToast("Unable to verify! try checking email, username or otp.", "error", 10)
        })
}

</script>

<template>
    <div class="page">

        <div class="heading text-center">
            <h1>SignUp</h1>
            <img v-if="emailVerify" src="/icons/personal_email.svg"
                alt="email image" class="smaller" loading="lazy">
            <img v-else src="/icons/add_user.svg" alt="add user" class="smaller"
                loading="lazy">
        </div>
        <div id="signup" class="px-2 pb-0 mx-auto">
            <form @submit.prevent="handleSignUp">
                <div class="container">
                    <label>Email: <input type="email" name='email' required
                            placeholder="This email will be used at verification." /></label>
                    <label>Username: <input type="text" name='username'
                            required /></label>
                    <div v-if="!emailVerify">
                        <label>Password: <input type="password" name='password'
                                required /></label>
                        <label>Password: <input type="password"
                                name='password__confirm' required /></label>
                        <label>First Name: <input type="text" name='firstName'
                                required /></label>
                        <label>Last Name: <input type="text"
                                name='lastName' /></label>
                    </div>
                    <div v-else>
                        <label>OTP: <input type="number" minlength="5"
                                maxlength="5" name='otp' /></label>
                    </div>
                    <input type="text" name='req' class="hidden"
                        :value="otpSent ? 'verify' : 'send'" hidden />

                    <div class="d-flex justify-content-around flex-wrap">
                        <button type='submit'
                            v-text="emailVerify ? (otpSent ? 'verify' : 'send otp') : 'SignUp'"></button>
                        <button type="button"
                            @click="router.back()">Cancel</button>
                    </div>
                    <details>
                        <summary class="editor-help pointer">Info</summary>
                        <p>
                            Without email verification your account will not
                            activated.
                        </p>
                    </details>
                </div>
            </form>
            <p class="text-center">* Go for *</p>
            <div
                class="d-flex justify-content-center col-gap-1 row-gap-1 flex-wrap">
                <NuxtLink :to="'/login/'">
                    <button type="button">login</button>
                </NuxtLink>
                <button type="button" @click="emailVerify = !emailVerify"
                    v-text="emailVerify ? 'SignUp' : 'Email Verification'"></button>
                <button v-if="emailVerify" type="button"
                    @click="otpSent = !otpSent"
                    v-text="otpSent ? 'get otp' : 'verify otp'"></button>
            </div>

        </div>
    </div>
</template>

<style scoped>
#signup {
    width: clamp(250px, 600px, 95vw);
}
</style>
