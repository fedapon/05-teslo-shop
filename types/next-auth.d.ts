import NextAuth from "next-auth"

declare module "next-auth" {
    interface Session {
        accessToken?: string
    }
    interface User {
        id?: string
        _id: string
        name?: string
        email?: string
        role?: string
    }
}
