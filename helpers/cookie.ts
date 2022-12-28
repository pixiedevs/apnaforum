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

const setCookieValue = (name: string, value: string, days: number = 5, doc: Document = document) => {
    try {
        doc.cookie = `${name}=${value}; domain=${document.location.hostname}; max-age=${days * 24 * 60 * 60}; path=/;`
    } catch (err) {
    }
}

const deleteCookie = (name: string, doc: Document = document) => {
    setCookieValue(name, '', -1)
}

export {
    getCookie,
    setCookieValue,
    deleteCookie
}
