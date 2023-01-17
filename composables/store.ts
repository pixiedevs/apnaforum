import StoreType from "@/models/StoreType";

const useStore = () => useState<StoreType>('store',
    () => ({
        topUsers: [],
        latestForums: [],
        topics: new Map()
    }))


export default useStore
