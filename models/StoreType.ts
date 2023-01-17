import Forum from "@/models/Forum";
import { UserShort } from "@/models/User";
import { TopicBase } from "@/models/Topic";

type StoreType = {
    topUsers: UserShort[]
    latestForums: Forum[]
    topics: Map<number, TopicBase[]>
}

export default StoreType
