import bcrypt from "bcryptjs"
import { User } from "@/models"
import { db } from "."
import { use } from "react"

export const checkUserEmailPassword = async (
    email: string,
    password: string
) => {
    await db.connect()
    const user = await User.findOne({ email }).lean()
    await db.connect()
    if (!user) return null
    if (!bcrypt.compareSync(password, user.password!)) {
        return null
    }
    const { _id, name, role } = user
    return {
        _id,
        name,
        email: email.toLocaleLowerCase(),
        role,
    }
}

// esta función creo o verifica el usuario de OAuth
export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
    await db.connect()
    const user = await User.findOne({ email: oAuthEmail }).lean()
    if (user) {
        await db.disconnect()
        const { _id, name, email, role } = user
        return { _id, name, email, role }
    }

    const newUser = new User({
        email: oAuthEmail,
        name: oAuthName,
        password: "@",
        role: "client",
    })
    await newUser.save()
    await db.disconnect()

    const { _id, name, email, role } = newUser
    return { _id, name, email, role }
}
