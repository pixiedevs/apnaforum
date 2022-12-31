export interface TopicBase {
    authorName: string
    name: string
    slug: string
    time: string
    likes: number
}

export interface Topic extends TopicBase {
    isactive: boolean
    authorUsername: string
    body: string
    forumData: {name: string, moderator: string}
    answer: number
    isLiked: boolean
};
