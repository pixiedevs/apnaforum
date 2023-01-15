import { nativeFetch, usePostFetch } from "@/helpers/api";
import { showToast } from "@/helpers/appState";
import Message from "@/models/Message";
import { getPersistData, setPersistData } from "./cookie";


export function voteService(action: string, to: string, toId: string, liked: boolean, onSuccess: Function, onError: Function) {

    nativeFetch<{ message: Message, count: number }>(`/vote/`, { action: action, to: to, id: toId }, liked ? 'DELETE' : 'GET')
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
            showToast(`Unable to perform task`, "error", 5)
            setTimeout(() => {
                onError()
            }, 500);
        })
}

function deleteService(to: string, query: object, id: number, onSuccess?: Function) {
    nativeFetch<{ message: Message }>(`/${(to === 'reply' ? 'reply' : `${to}s`)}/delete`, query, 'DELETE')
        .then((data) => {
            if (data.message) {
                showToast(data.message.desc, data.message.tag, 5)
                if (onSuccess && data.message.tag === "success") {
                    onSuccess()
                    if (to === 'reply' || to === 'comment') {
                        document.querySelector(`#${to}-${id} .card-text`).innerHTML = '[DELETED]'
                    }
                }
            }
        }).catch((err) => {
            showToast(`Unable to delete ${to}!`, "error", 5)
        });
}

export function deleteComment(id: number) {
    showToast('Are you sure to delete this comment?', 'warning', 10, [{
        name: 'DELETE', do: () => {
            deleteService("comment", { "comment-id": id }, id)
        }
    }])
}

export function deleteReply(id: number) {
    showToast('Are you sure to delete this reply?', 'warning', 10, [{
        name: 'DELETE', do: () => {
            deleteService("reply", { "reply-id": id }, id)
        }
    }])
}

export function deleteTopic(id: string) {
    showToast('Are you sure to delete this topic?', 'warning', 10, [{
        name: 'DELETE', do: () => {
            deleteService("topic", { "topic-slug": id }, 0, () => { useRouter().back() })
        }
    }])
}


export function addService(to: string, form: FormData, onSuccess: Function) {
    usePostFetch(`/${(to === 'reply' ? 'reply' : `${to}s`)}/add/`, form)
        .then((data: { message: Message, id?: number, slug?: string }) => {
            if (data.message.tag === "success") {
                onSuccess(data.id ?? data.slug)
                setTimeout(() => {
                    showToast(data.message.desc, data.message.tag, 10,
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
            showToast(`Unable to add ${to}!`, "error", 5)
        })
}

export function persistComments(persist_key: string, values: any, time: string) {
    const key = setPersistData(persist_key, { comments: values, time: time }, 0, false)
    let keys: string[] = JSON.parse(sessionStorage.getItem("topic__keys")) ?? []
    if (key)
        keys.push(key.toString())
    else
        sessionStorage.clear()

    if (keys.length > 5) {
        sessionStorage.removeItem(keys[0])
        keys.shift()
    }
    sessionStorage.setItem("topic__keys", JSON.stringify(keys))
}

export function ifPersistComments(slug: string, page: number, onSuccss: Function, onError: Function) {
    let time = new Date().toString();
    try {
        if (getPersistData(`${slug}=${page}`, false)) {
            nativeFetch<{ time: string }>(`/topics/${slug}/`, { res: time, page: page }, 'GET')
                .then((res) => {
                    const data = getPersistData(`${slug}=${page}`, false)

                    time = res.time

                    if (res.time === data.time) {
                        onSuccss(data)
                        return;
                    }
                    onError(time)
                })
                .catch((err) => {
                    onError(time)
                });
        } else {
            onError(time)
        }
    } catch (er) {
        onError(time)
    }
}

export function markCommentUserful(slug: string, commentId: number, remove: boolean, onSuccess: Function) {

    nativeFetch<{ message: Message, id: number }>(`/comments/markuseful/`, { "comment-id": commentId, "topic-id": slug }, remove ? 'DELETE' : 'GET')
        .then((data) => {
            if (data.message) {
                showToast(data.message.desc, data.message.tag, 5)
                if (data.message.tag === "success") {
                    onSuccess(data.id)
                }
            }
        })
        .catch((err) => {
            console.log(err);
        });
}