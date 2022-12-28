type Toast = {
    show: boolean
    desc: string
    tag: string
    delete?: boolean
    actions?: { name: string, do: Function }[]
}

export default Toast
