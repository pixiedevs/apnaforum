const config = useRuntimeConfig()

const headers = {
    "Accept": "*/*",
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": config.authKey
}

export const sendData = async (path: string, body: {}) => {

    const r = await fetch(`${config.public.apiBase}${path}?res_type=api`, {
        method: 'POST',
        body: new URLSearchParams(body),
        headers
    })
    return await r.json()
}

export const getData = async (path: string, query = {}, method = 'GET') => {

    const r = await fetch(`${config.public.apiBase}${path}?res_type=api`, {
        method: method,
        headers
    })
    return await r.json()
}
