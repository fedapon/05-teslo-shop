import NextAuth from "next-auth"

declare module "next-auth" {
    interface Session {
        accessToken?: string
    }
    interface User {
        _id: string
        name?: string
        email?: string
        role?: string
    }
}
