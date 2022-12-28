export const makeSecret = (msg: string, low: false) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(msg)
    return crypto.subtle.digest(low ? "SHA-1" : "SHA-256", data)
}

export const getRoutes = () => {
    return [
        { name: 'Home', path: '/' },
        { name: 'Topics', path: '/topics/' },
        { name: 'Add Topic', path: '/add-topic/' },
    ]
} 