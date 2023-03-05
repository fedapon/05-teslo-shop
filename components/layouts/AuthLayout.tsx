import { PropsWithChildren } from "react"
import Head from "next/head"
import { Box } from "@mui/material"

interface Props extends PropsWithChildren {
    title: string
}

export const AuthLayout = ({ children, title }: Props) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <main>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="cente"
                    height="calc(100vh - 200px)"
                >
                    {children}
                </Box>
            </main>
        </>
    )
}
