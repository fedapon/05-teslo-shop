import { PropsWithChildren } from "react"
import Head from "next/head"
import { Navbar, SideMenu } from "../ui"

interface Props extends PropsWithChildren {
    title: string
    pageDescription: string
    imageFullUrl?: string
}

export const ShopLayout = ({
    children,
    title,
    pageDescription,
    imageFullUrl,
}: Props) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="desciption" content={pageDescription} />
                <meta name="og:title" content={title} />
                <meta name="og:description" content={pageDescription} />
                {imageFullUrl && (
                    <meta name="og:image" content={imageFullUrl} />
                )}
            </Head>

            <nav>
                <Navbar />
            </nav>

            <SideMenu />

            <main
                style={{
                    margin: "80px auto",
                    maxWidth: "1440px",
                    padding: "0px 30px",
                }}
            >
                {children}
            </main>
            <footer>{/* TODO Footer */}</footer>
        </>
    )
}
