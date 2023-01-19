export interface TopicBase {
    authorUsername: string
    name: string
    slug: string
    time: string
    likes: number
}

export interface Topic extends TopicBase {
    isactive: boolean
    authorName: string
    body: string
    forumData: { name: string, moderator: string }
    answer?: number
    isLiked: boolean
    tags: string[]
};
