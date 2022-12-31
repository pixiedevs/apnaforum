import { nativeFetch } from "@/helpers/api";
import { showToast } from "@/helpers/appState";


const voteService = (action: string, to: string, toId: string, liked: boolean, onSuccess: Function, onError: Function) => {

    nativeFetch(`api/vote/`, `&action=${action}&to=${to}&id=${toId}`, liked ? 'DELETE' : 'GET')
        .then((r) => r.json())
        .then((d) => {
            if (d.message.tag === 'success') {
                onSuccess(d.count)
            } else {
                if (d.message)
                    showToast(d.message.desc, d.message.tag)
                throw new Error("")
            }
        })
        .catch((e) => {
            showToast(`Unable to perform task`, "error", 5000)
            setTimeout(() => {
                onError()
            }, 500);
        })
}

const deleteService = (to: string, query: string, onSuccess?: Function) => {
    nativeFetch(`/api/${to}s/delete`, query, 'DELETE')
        .then((res) => res.json())
        .then((data) => {
            if (data.message) {
                showToast(data.message.desc, data.message.tag, 5000)
                if (onSuccess && data.message.tag === "success") {
                    onSuccess()
                }
            }
        }).catch((err) => {
            showToast(`Unable to delete ${to}!`, "error", 5000)
        });
}

const deleteComment = (id: number) => {
    showToast('Are you sure to delete this comment?', 'warning', 10000, [{
        name: 'DELETE', do: () => {
            deleteService("comment", `&comment-id=${id}`)
        }
    }])
}

const deleteReply = (id: number) => {
    showToast('Are you sure to delete this reply?', 'warning', 10000, [{
        name: 'DELETE', do: () => {
            deleteService("reply", `&reply-id=${id}`)
        }
    }])
}

const deleteTopic = (id: string) => {
    showToast('Are you sure to delete this topic?', 'warning', 10000, [{
        name: 'DELETE', do: () => {
            deleteService("topic", `&topic-slug=${id}`, () => { useRouter().back() })
        }
    }])
}

export { voteService, deleteComment, deleteReply, deleteTopic }
