import { deleteUserCookies } from "@/helpers/cookie"
import { showToast } from "./appState"

const CONTACT_TYPES = {
    "contact": "Contact",
    "report_user": "Report User",
    "report_topic": "Report Topic",
    "report_comment": "Report Comment",
    "report_reply": "Report Reply",
    "report_error": "Report Error",
}

const getContactTypes = () => (CONTACT_TYPES)

const _getFullPathAndHeader = (path = '/', auth = true) => {
    const runtimeConfig = useRuntimeConfig()
    let token = '';
    if (path.charAt(0) !== '/') path = '/' + path;

    if (auth) {
        token = useCookie('sessiona').value
        if (!token) {
            auth = false
        }
    }

    const header = auth ? {
        "Accept": "*/*",
        "Authorization": 'Bearer ' + token
    } : {}

    return { path: runtimeConfig.public.apiBase + "/api" + path, header: header }
}

const usePostFetch = async (path = '/', formData: FormData, method: string = 'POST', auth = true) => {
    const options = _getFullPathAndHeader(path, auth)

    const r = await fetch(`${options.path}?res_type=api`, {
        method: method,
        body: formData,
        credentials: "same-origin",
        headers: options.header
    })
    return await r.json()
}

/* The data string must be start with & */
const dataFetch = <T>(path = '/', query = '', method = 'GET', auth = true) => {
    const options = _getFullPathAndHeader(path, auth)

    return useFetch<T>(`${options.path}?res_type=api${query}`, {
        method: method,
        credentials: 'same-origin',
        headers: options.header
    });
}

/* The data string must be start with & */
const nativeFetch = <T>(path = '/', query = '', method = 'GET', auth = true) => {
    const options = _getFullPathAndHeader(path, auth)

    return $fetch<T>(`${options.path}?res_type=api${query}`, {
        method: method,
        credentials: 'same-origin',
        headers: options.header
    });
}

const handleLogout = (syncToBackend = false) => {
    const authUser = useAuthUser()

    if (syncToBackend) {
        dataFetch('/logout/')
            .then((res) => { })
            .catch((err) => { });
    }
    deleteUserCookies()
    authUser.value.username = ''
    authUser.value.isa = ''
    authUser.value.auth = false
}

const updateAuthUser = () => {
    const authUser = useAuthUser()

    nativeFetch<{ user: typeof authUser.value, message?: any }>('/user-auth/')
        .then((data) => {
            authUser.value.auth = data.user.auth
            authUser.value.username = data.user.username
            authUser.value.isa = data.user.isa
        }).catch((err) => {
            handleLogout()
        })
}

const doReport = (name: string, id: string, type: string) => {

    nativeFetch('/report/')
        .then((data) => {
        })
        .catch((err) => {
        })
}

export { usePostFetch, dataFetch, nativeFetch, updateAuthUser, handleLogout, doReport, getContactTypes }
