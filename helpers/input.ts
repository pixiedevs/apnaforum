import pagedown from "pagedown"

/* Returns the converted and sanitized HTML of the given markdown string */
const markToHtml = (text: string) => {
    var safeConverter = pagedown.getSanitizingConverter();
    let res = safeConverter.makeHtml(text)
    return res
}

const markToHtmlPreview = (text: string) => {
    // var converter = new pagedown.Converter();
    // let res = converter.makeHtml(text)
    // return res
    
    return markToHtml(text)
}
/* Convert JSON object data to FormData for POST/PUT submission */
const objToFormData = (obj: object): FormData => {
    const form = new FormData()
    Object.entries(obj).forEach((o) => {
        form.set(o[0], o[1]);
    })
    return form
}
const formDataToObj = (formData: FormData): object => {
    const form = new FormData()
    let obj = {}
    formData.forEach((v, k)=> {
        obj[k] = v
    })
    // Object.entries(obj).forEach((o) => {
    //     form.set(o[0], o[1]);
    // })
    return obj
}


export {
    markToHtml,
    markToHtmlPreview,
    objToFormData,
    formDataToObj
}
