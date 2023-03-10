import { dbUsers } from "@/database"
import NextAuth, { Awaitable, NextAuthOptions, User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"

export const authOption: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        }),
        // ...add more providers here
        Credentials({
            name: "Custom Login",
            credentials: {
                email: {
                    label: "Correo",
                    type: "email",
                    placeholder: "Tu correo",
                },
                password: {
                    label: "Contraseña",
                    type: "password",
                    placeholder: "Tu contraseña",
                },
            },
            async authorize(credentials) {
                return await dbUsers.checkUserEmailPassword(
                    credentials!.email,
                    credentials!.password
                )
            },
        }),
    ],
    //Custom Pages
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/logout",
    },
    session: {
        maxAge: 2592000, //30d
        strategy: "jwt",
        updateAge: 86400, //cada día se va a actualizar
    },
    callbacks: {
        async jwt({ token, account, user }) {
            // console.log({ token, account, user })
            if (account) {
                token.accessToken = account.access_token
                switch (account.type) {
                    case "oauth":
                        token.user = await dbUsers.oAuthToDbUser(
                            user?.email || "",
                            user?.name || ""
                        )
                        break

                    case "credentials":
                        token.user = user
                        break
                }
            }
            return token
        },
        async session({ session, token, user }) {
            // console.log({ session, token, user })
            session.accessToken = token.accessToken as string
            session.user = token.user as any
            return session
        },
    },
}

export default NextAuth(authOption)
