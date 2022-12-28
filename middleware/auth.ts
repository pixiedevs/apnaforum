import { showToast } from "@/helpers/appState"

export default defineNuxtRouteMiddleware((/* to, from */) => {
    const authUser = useAuthUser()

    if (!authUser.value.auth && !useCookie('sessiona').value) {

        if (process.server) {
            return navigateTo('/login/')
        }

        showToast("You are not Authorized!", "warning", 0, [{ name: 'Login', do: () => { navigateTo('/login/') } }])
        return abortNavigation()
    }
})