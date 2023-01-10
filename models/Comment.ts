import Reply from "./Reply"

interface Comment {
    id: number
    authorName: string
    authorUsername: string
    body: string
    likes: number
    replies: Reply[]
    repliesCount: number
    time: string
};

export default Comment
