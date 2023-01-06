import { nativeFetch, usePostFetch } from "@/helpers/api";
import { showToast } from "@/helpers/appState";
import Message from "@/models/Message";


const voteService = (action: string, to: string, toId: string, liked: boolean, onSuccess: Function, onError: Function) => {

    nativeFetch<{ message: Message, count: number }>(`/vote/`, `&action=${action}&to=${to}&id=${toId}`, liked ? 'DELETE' : 'GET')
        .then((d) => {
            if (d.message.tag === 'success') {
                onSuccess(d.count)
            } else {
                if (d.message)
                    showToast(d.message.desc, d.message.tag)
                throw new Error()
            }
        })
        .catch((e) => {
            showToast(`Unable to perform task`, "error", 5000)
            setTimeout(() => {
                onError()
            }, 500);
        })
}

const deleteService = (to: string, query: string, id: number, onSuccess?: Function) => {
    nativeFetch<{ message: Message }>(`/${(to === 'reply' ? 'reply' : `${to}s`)}/delete`, query, 'DELETE')
        .then((data) => {
            if (data.message) {
                showToast(data.message.desc, data.message.tag, 5000)
                if (onSuccess && data.message.tag === "success") {
                    onSuccess()
                    if (to === 'reply' || to === 'comment') {
                        document.querySelector(`#${to}-${id} .card-text`).innerHTML = '[DELETED]'
                    }
                }
            }
        }).catch((err) => {
            showToast(`Unable to delete ${to}!`, "error", 5000)
        });
}

const deleteComment = (id: number) => {
    showToast('Are you sure to delete this comment?', 'warning', 10000, [{
        name: 'DELETE', do: () => {
            deleteService("comment", `&comment-id=${id}`, id)
        }
    }])
}

const deleteReply = (id: number) => {
    showToast('Are you sure to delete this reply?', 'warning', 10000, [{
        name: 'DELETE', do: () => {
            deleteService("reply", `&reply-id=${id}`, id)
        }
    }])
}

const deleteTopic = (id: string) => {
    showToast('Are you sure to delete this topic?', 'warning', 10000, [{
        name: 'DELETE', do: () => {
            deleteService("topic", `&topic-slug=${id}`, 0, () => { useRouter().back() })
        }
    }])
}


const addService = (to: string, form: FormData, onSuccess: Function) => {
    usePostFetch(`/${(to === 'reply' ? 'reply' : `${to}s`)}/add/`, form)
        .then((data: { message: Message, id?: number, slug?: string }) => {
            if (data.message.tag === "success") {
                onSuccess(data.id ?? data.slug)
                setTimeout(() => {
                    showToast(data.message.desc, data.message.tag, 10000,
                        [{
                            name: 'View', do: () => {
                                to === 'topic'
                                    ? navigateTo('/topics/' + data.slug)
                                    : document.getElementById(`${to}-${data.id}`).scrollIntoView(true)
                            }
                        }])
                }, 500);
            }
            else throw new Error()
        }).catch((err) => {
            showToast(`Unable to add ${to}!`, "error", 5000)
        })
}

export { voteService, deleteComment, deleteReply, deleteTopic, addService }
