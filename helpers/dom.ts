import { showToast } from "@/helpers/appState"

/* Get full path (without hash) */
const getFullPath = () => {
    return document.location.origin + document.location.pathname
}

const toggleClass = (query: string, className = 'show') => {
    let element = document.querySelector(query)
    if (element) {
        element.classList.toggle(className)
        return true
    }
    return false
}
const copyTextWithMsg = (text: string, msg: string = 'Copied to clipboard', msgIntervel: number = 2000) => {
    showToast(msg, "success",msgIntervel)
    navigator.clipboard.writeText(text)
}

export {
    getFullPath,
    toggleClass,
    copyTextWithMsg
}
