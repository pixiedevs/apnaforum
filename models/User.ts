interface UserProfile {
    profile: string,
    private: boolean,
    email: string,
    company: string,
    location: string,
    status: string,
    about: string,
    social: any
}

export interface UserShort {
    username: string,
    full_name: string,
    isa: string
}

interface User extends UserShort {
    email: string,
    profile: { public: UserProfile, private: any, isprivate: boolean },
}

export default User
