const Message = {
    create(message: string, tag: string = "info") {
        return { message: { desc: message, tag: tag } }
    }
}
export default Message
