import { getToken } from "next-auth/jwt"
import { getSession } from "next-auth/react"
import { NextFetchEvent, NextRequest, NextResponse } from "next/server"

export async function middleware(req: NextRequest) {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  if (req.nextUrl.pathname.startsWith("/api/admin")) {
    if (!session) {
      return new Response(JSON.stringify({ message: "No autorizado" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    const validRoles = ["admin", "super-user", "SEO"]
    if (!validRoles.includes(session.user.role)) {
      return new Response(JSON.stringify({ message: "No autorizado" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    return NextResponse.next()
  }

  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!session) {
      const requestedPage = req.nextUrl.pathname
      return NextResponse.redirect(`/auth/login?p=${requestedPage}`)
    }

    const validRoles = ["admin", "super-user", "SEO"]

    if (!validRoles.includes(session.user.role)) {
      const url = req.nextUrl.clone()
      url.pathname = "/"
      return NextResponse.redirect(url)
    }

    return NextResponse.next()
  }

  if (!session) {
    const requestedPage = req.nextUrl.pathname
    const url = req.nextUrl.clone()
    url.pathname = "/auth/login"
    url.search = `p=${requestedPage}`
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/api/admin/:path*",
    "/admin/:path*",
    "/checkout/address",
    "/checkout/summary",
  ],
}
