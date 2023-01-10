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

    if (form.get('username').length < 5) {
        showToast("Username must be more or equal to 5 letters.", "warning", 5000)
        return
    }

    if (emailVerify.value) return handleVerification(form)

    if (form.get('password').length < 8) {
        showToast("Password must be more or equal to 8 letters.", "warning", 5000)
        return
    }
    if (form.get('password') !== form.get('password__confirm')) {
        showToast("Password and confirm password are not same!", "warning", 5000)
        return
    }

    startLoading(2000)
    usePostFetch(`/signup/`, form, 'POST')
        .then((data) => {
            if (data.message) {
                showToast(data.message.desc, data.message.tag, 5000)
                if (data.message.tag === 'success') {
                    emailVerify.value = true
                }
                stopLoading()
            } else {
                throw new Error()
            }
        })
        .catch((err) => {
            showToast("Unable to SignUp! try changing email, username or password.", "error", 10000)
        })
}
const handleVerification = (form) => {
    if (form.get('otp')) {
        form.set('req', 'verify')
    }
    startLoading(2000)
    usePostFetch(`/api/email-verify/`, JSON.stringify(formDataToObj(form)), 'POST')
        .then((data) => {
            if (data.message) {
                showToast(data.message.desc, data.message.tag, 5000)
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
        .catch((err) => {
            showToast("Unable to verify! try checking email, username or otp.", "error", 10000)
        })
}

</script>

<template>
    <div class="page">

        <div class="heading text-center">
            <h1>SignUp</h1>
        </div>

        <div id="signup" class="py-5 px-2 pb-0 mx-auto mt-5">
            <form @submit.prevent="handleSignUp">
                <div class="container">
                    <label>Email: <input type="email" name='email' required
                            value="pyadav7787@gmail.com"
                            placeholder="This email will be used at verification." /></label>
                    <label>Username: <input type="text" name='username'
                            value="deepak" required /></label>
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
                        <input type="text" name='req' class="hidden"
                            :value="otpSent ? 'verify' : 'send'" hidden />
                        <label v-if="otpSent">OTP: <input type="number"
                                minlength="5" maxlength="5"
                                name='otp' /></label>
                    </div>

                    <div class="d-flex justify-content-around">
                        <button class="small" type='submit'
                            v-text="emailVerify ? (otpSent ? 'verify' : 'send otp') : 'SignUp'"></button>
                        <button class="small" type="button"
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
            <div class="text-center mb-4">
                <NuxtLink :to="'/login/'"><button type="button">login</button>
                </NuxtLink>
                <button type="button" class="ms-2"
                    @click="emailVerify = !emailVerify"
                    v-text="emailVerify ? 'SignUp' : 'Email Verification'"></button>
                <button v-if="emailVerify" type="button" class="ms-2"
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
