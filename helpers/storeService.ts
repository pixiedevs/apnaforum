import { dataFetch } from "@/helpers/api";
import { UserShort } from "@/models/User";
import { getPersistData, setPersistData } from "./cookie";
import Forum from "@/models/Forum";
import StoreType from "@/models/StoreType";


export const updateTopUsers = () => {
    const store = useState<StoreType>('store')

    if (getPersistData('users-top', false)) {
        store.value.topUsers = getPersistData('users-top', false)
    } else {
        dataFetch<{ users: UserShort[] }>('/users-top/')
            .then((data) => {
                store.value.topUsers = data.data.value.users
                setPersistData('users-top', store.value.topUsers, 0, false)
            })
            .catch(() => { })
    }
}


export const updateForums = () => {
    const store = useState<StoreType>('store')

    if (getPersistData('forums-new', false)) {
        store.value.latestForums = getPersistData('forums-new', false)
    } else {
        dataFetch<{ forums: Forum[] }>('/forums/')
            .then((data) => {
                store.value.latestForums = data.data.value.forums
                setPersistData('forums-new', store.value.latestForums, 0, false)
            })
            .catch(() => { })
    }
}
