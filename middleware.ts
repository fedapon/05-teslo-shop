import { NextFetchEvent, NextRequest, NextResponse } from "next/server"
import { jwt } from "./utils"

export async function middleware(req: NextRequest, ex: NextFetchEvent) {
    if (req.nextUrl.pathname.startsWith("/checkout/address")) {
        const token = req.cookies.get("token")?.value || ""
        try {
            // await jwt.isValidToken(token)
            if (token?.length > 0) return NextResponse.next()
            return NextResponse.redirect(
                new URL(`/auth/login?p=${req.nextUrl.pathname}`, req.url)
            )
        } catch (error) {
            return NextResponse.redirect(
                new URL(`/auth/login?p=${req.nextUrl.pathname}`, req.url)
            )
        }
    }
}
