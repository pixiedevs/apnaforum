import AuthUser from "@/models/AuthUser"


const useAuthUser = () => useState<AuthUser>('authUser',
    () => ({
        auth: false,
        username: "",
        isa: "user"
    }))


export default useAuthUser
