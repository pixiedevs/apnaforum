export interface TopicBase {
    authorName: string
    isactive: boolean
    name: string
    pinned: boolean
    slug: string
    time: string
}

export interface TopicShort extends TopicBase {
    dislikes: number
    likes: number
}

export interface Topic extends TopicBase {
    authorUsername: string
    body: string
    forumData: {name: string, moderator: string}
    likes: number
    answer: number
    isLiked: boolean
};

// export { Topic, TopicBase, TopicShort }
