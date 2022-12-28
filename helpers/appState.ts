import Toast from "@/models/Toast"

/* Set and Show Toast message */
const showToast = (desc: string, tag = "info", milisec = 0, actions?: { name: string, do: Function }[]) => {
    const toasts = useState<Toast[]>('mainToast')
    let i = toasts.value.findIndex((t) => { if (t.desc === desc) return t })
    if (i >= 0) {
        toasts.value.splice(i)
    }
    toasts.value.push({ show: true, desc, tag, actions })
    const index = toasts.value.length - 1
    if (milisec > 0) {
        setTimeout(() => {
            toasts.value[index].show = false
            setTimeout(() => {
                i = toasts.value.findIndex((t) => { if (t.desc === desc) return t })
                toasts.value.splice(i)
            }, 500);
        }, milisec);
    }
    while (toasts.value.length > 5) {
        toasts.value.splice(0)
    }
}

/* Hide Toast message */
const hideToast = (index = -1) => {
    const toasts = useState<Toast[]>('mainToast')
    if (index < 0) {
        index = toasts.value.length - 1
    }
    toasts.value[index].show = false
}

/* Show all Toast messages */
const showAllToasts = () => {
    const toasts = useState<Toast[]>('mainToast')
    toasts.value
    for (let i = 0; i < toasts.value.length; i++) {
        toasts.value[i].show = true
    }
}

/* Start the Main Loading. If milliseconds provided then hide the loading after the given time */
const startLoading = (milliseconds: number = 0) => {
    useState('mainLoading').value = true
    if (milliseconds > 0) {
        setTimeout(() => {
            stopLoading()
        }, milliseconds);
    }
}

/* Stops the Main Loading */
const stopLoading = () => {
    useState('mainLoading').value = false
}


export { showToast, hideToast, showAllToasts, startLoading, stopLoading }
