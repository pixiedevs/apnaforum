declare global {
    interface String {
        asTitle(): string
        asTime(): string
        isalphanum(): boolean
    }
}

String.prototype.asTitle = function () {
    let str = this.toString()
    try {
        const sliced = str.slice(1);

        return (
            str.charAt(0).toUpperCase() + (sliced.toUpperCase() === sliced ? sliced.toLowerCase() : sliced)
        )
    }
    catch { return str }
}

String.prototype.asTime = function () {
    let str = this.toString()
    try {
        const t = new Date(str)
        return t.toLocaleTimeString("en-IN", { "hour": "numeric", "minute": "numeric" }).toString().toUpperCase() + " - " +
            t.toLocaleDateString("en-IN", {
                "year": "numeric",
                "month": "short",
                "day": "numeric",
            })
    }
    catch { return str }
}

String.prototype.isalphanum = function () {
    return this.toString() === (this.toString().replace(/[^a-z)-9]/gi, ''))
}

export { }
