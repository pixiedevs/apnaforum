/* Extracts the tookie respect to the given name */
const getCookie = (name: string, doc: any = document): string => {
    var cookieValue = '';
    if (doc.cookie && doc.cookie !== '') {
        var cookies = doc.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const setCookieValue = (name: string, value: string, days: number = 5) => {
    try {
        document.cookie = `${name}=${value}; domain=${document.location.hostname}; max-age=${days * 24 * 60 * 60}; path=/;`
    } catch (err) {
    }
}

const deleteCookie = (name: string) => {
    setCookieValue(name, '', -1)
}

const deleteUserCookies = () => {
    deleteCookie("sessiona")
    deleteCookie("sessionr")
}

const getPersistData = (key: string, inCookie = true) => {
    try {
        if (inCookie)
            return JSON.parse(getCookie("ps:".concat(key)))
        else
            return JSON.parse(sessionStorage.getItem("ps:".concat(key))).value
    } catch (er) {
        return false
    }
}

const setPersistData = (key: string, value: any, minutes = 60, inCookie = true) => {

    try {
        if (inCookie)
            document.cookie = `ps:${key}=${JSON.stringify(value)}; domain=${document.location.hostname}; max-age=${minutes * 60}; path=/;`
        else
            sessionStorage.setItem("ps:".concat(key), JSON.stringify({ value, time: new Date().toString() }))
    } catch (er) {
        return false
    }
    return true
}

export {
    getCookie,
    setCookieValue,
    deleteCookie,
    getPersistData,
    setPersistData,
    deleteUserCookies,
}
