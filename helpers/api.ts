import { deleteCookie } from "@/helpers/cookie"
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

    return { path: runtimeConfig.public.apiBase + path, header: header }
}

const usePostFetch = async (path = '/', formData: FormData, method: string = 'POST', auth = true) => {

    const options = _getFullPathAndHeader(path, auth)

    return fetch(`${options.path}?res_type=api`, {
        method: method,
        body: formData,
        credentials: "same-origin",
        headers: options.header
    });
}

/* The path must not start with '/' and data string must be start with & */
const dataFetch = <T>(path = '/', query = '', method = 'GET', auth = true) => {
    const options = _getFullPathAndHeader(path, auth)

    return useFetch<T>(`${options.path}?res_type=api${query}`, {
        method: method,
        credentials: 'same-origin',
        headers: options.header
    });
}

/* The path must not start with '/' and data string must be start with & */
const nativeFetch = (path = '/', query = '', method = 'GET', auth = true) => {
    const options = _getFullPathAndHeader(path, auth)

    return fetch(`${options.path}?res_type=api${query}`, {
        method: method,
        credentials: 'same-origin',
        headers: options.header
    });
}

const handleLogout = (syncToBackend = false) => {
    if (syncToBackend) {
        dataFetch('api/logout/')
            .then((res) => { })
            .catch((err) => { });
    }
    deleteCookie("sessiona")
    deleteCookie("sessionr")
    updateAuthUser()
}

const updateAuthUser = () => {
    const authUser = useAuthUser()

    nativeFetch('/api/user-auth/')
        .then((res) => res.json())
        .then((data) => {
            if (data.message) {
                showToast(data.message.desc, data.message.tag)
            }

            authUser.value.auth = data.auth
            authUser.value.username = data.username
            authUser.value.isa = data.isa
        })
        .catch((err) => {
            authUser.value.username = ''
            authUser.value.isa = ''
            authUser.value.auth = false
        })
}

const doReport = (name: string, id: string, type: string) => {

    nativeFetch('/api/report/')
        .then((res) => res.json())
        .then((data) => {
        })
        .catch((err) => {
        })
}

export { usePostFetch, dataFetch, nativeFetch, updateAuthUser, handleLogout, doReport, getContactTypes }
