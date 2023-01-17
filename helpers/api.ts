import { deleteUserCookies } from "@/helpers/cookie"
import { formDataToObj } from "./input"

const CONTACT_TYPES = {
    "contact": "Contact",
    "report_user": "Report User",
    "report_topic": "Report Topic",
    "report_comment": "Report Comment",
    "report_reply": "Report Reply",
    "report_error": "Report Error",
}

export const getContactTypes = () => (CONTACT_TYPES)

export const is_bot = () => /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent)

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

    return { path: (path.startsWith('/api') ? path : runtimeConfig.public.apiBase + "/api" + path), header: header }
}

export const usePostFetch = async (path = '/', form: FormData, method: string = 'POST', auth = true) => {
    const options = _getFullPathAndHeader(path, auth)

    options.header["Content-Type"] = "application/json"
    // options.header["Content-Type"] = (typeof form === 'string') ? "application/json" : "multipart/form-data"

    const r = await fetch(`${options.path}?res_type=api`, {
        method: method,
        body: JSON.stringify(formDataToObj(form)),
        credentials: "same-origin",
        headers: options.header
    })
    return await r.json()
}

/* The data string must be start with & */
export const dataFetch = <T>(path = '/', queryObj = {}, method = 'GET', auth = true) => {
    const options = _getFullPathAndHeader(path, auth)
    let query = ""
    Object.entries(queryObj).forEach(q => {
        query = query.concat(`&${q[0]}=${q[1]}`)
    })

    return useFetch<T>(`${options.path}?res_type=api${query}`, {
        method: method,
        credentials: 'same-origin',
        headers: options.header
    });
}

/* The data string must be start with & */
export const nativeFetch = <T>(path = '/', queryObj = {}, method = 'GET', auth = true) => {
    const options = _getFullPathAndHeader(path, auth)
    let query = ""
    Object.entries(queryObj).forEach(q => {
        query = query.concat(`&${q[0]}=${q[1]}`)
    })

    return $fetch<T>(`${options.path}?res_type=api${query}`, {
        method: method,
        credentials: 'same-origin',
        headers: options.header
    });
}

export const handleLogout = (syncToBackend = false) => {
    const authUser = useAuthUser()

    if (syncToBackend) {
        dataFetch('/logout/')
            .then(() => { })
            .catch(() => { });
    }
    deleteUserCookies()
    authUser.value.username = ''
    authUser.value.isa = ''
    authUser.value.auth = false
}

export const updateAuthUser = () => {
    const authUser = useAuthUser()

    nativeFetch<{ user: typeof authUser.value, message?: any }>('/user-auth/')
        .then((data) => {
            authUser.value.auth = data.user.auth
            authUser.value.username = data.user.username
            authUser.value.isa = data.user.isa
        }).catch(() => {
            handleLogout()
        })
}

export const doReport = (name: string, id: string, type: string) => {

    nativeFetch('/report/')
        .then((data) => {
        })
        .catch(() => {
        })
}
