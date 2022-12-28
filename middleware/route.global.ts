import { updateAuthUser } from "@/helpers/api"

export default defineNuxtRouteMiddleware((to) => {
    const authUser = useAuthUser()
    const leftSidebar = useState('leftSidebar')

    if (leftSidebar.value) {
        leftSidebar.value = false
    }

    if (!authUser.value.auth) {
        const token = useCookie('sessiona').value
        if (token) {
            updateAuthUser()
        }
    }
})