import { getData } from "@/server/utils/ssrApi";

var users = []
var updated_at = new Date()

export default defineEventHandler(async e => {
    const config = useRuntimeConfig()
    if (users?.length === 0 || (new Date().getMinutes() - updated_at.getMinutes()) > Number(config.cacheTime)) {
        users = await getData('/api/users-top/').then((data) => data.users).catch((err) => { users = [] })
        updated_at = new Date()
    }

    e.node.res.end(JSON.stringify({ users }))
})
