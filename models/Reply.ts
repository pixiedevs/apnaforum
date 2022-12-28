interface Reply {
    id: number
    authorUsername: string
    likes: number
    body: string
    time: string
    reply_of: { id: string, username: string }
};

export default Reply
