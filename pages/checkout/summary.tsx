import { useContext, useEffect, useState } from "react"
import NextLink from "next/link"
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    Typography,
    Link,
    Chip,
} from "@mui/material"
import { CartContext } from "@/context"
import { ShopLayout } from "@/components/layouts"
import { CartList, OrderSummary } from "@/components/cart"
import { countries } from "@/utils"
import Cookies from "js-cookie"
import { useRouter } from "next/router"

const SummaryPage = () => {
    const router = useRouter()
    const { shippingAddress, numberOfItems, createOrder } =
        useContext(CartContext)

    const [isPosting, setIsPosting] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        if (!Cookies.get("firstName")) {
            router.push("/checkout/address")
        }
    }, [router])

    const onCreateOrder = async () => {
        setIsPosting(true)
        const { hasError, message } = await createOrder() //todo: depende del resultado
        if (hasError) {
            setIsPosting(false)
            setErrorMessage(message)
            return
        }
        router.replace(`/orders/${message}`)
    }

    if (!shippingAddress) return <></>

    return (
        <ShopLayout
            title={"Resumen de compra"}
            pageDescription={"Resumen de la orden"}
        >
            <Typography variant="h1" component="h1">
                Resumen de la orden
            </Typography>
            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h2">
                                Resumen ({numberOfItems}{" "}
                                {numberOfItems === 1 ? "producto" : "productos"}
                                )
                            </Typography>

                            <Divider sx={{ marginY: 1 }} />

                            <Box display="flex" justifyContent="end">
                                <NextLink
                                    href="/checkout/address"
                                    passHref
                                    legacyBehavior
                                >
                                    <Link underline="always">Editar</Link>
                                </NextLink>
                            </Box>

                            <Typography variant="subtitle1">
                                Dirección de entrega
                            </Typography>
                            <Typography>
                                {shippingAddress?.firstName}{" "}
                                {shippingAddress?.lastName}
                            </Typography>
                            <Typography>{shippingAddress?.address}</Typography>
                            <Typography>{shippingAddress?.address2}</Typography>
                            <Typography>
                                {shippingAddress?.city}, {shippingAddress?.zip}
                            </Typography>
                            <Typography>
                                {
                                    countries.find(
                                        (c) =>
                                            c.code === shippingAddress.country
                                    )?.name
                                }
                            </Typography>
                            <Typography>{shippingAddress?.phone}</Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box display="flex" justifyContent="end">
                                <NextLink href="/cart" passHref legacyBehavior>
                                    <Link underline="always">Editar</Link>
                                </NextLink>
                            </Box>

                            <OrderSummary />

                            <Box
                                sx={{ mt: 3 }}
                                display="flex"
                                flexDirection="column"
                            >
                                <Button
                                    color="secondary"
                                    className="circular-btn"
                                    fullWidth
                                    onClick={onCreateOrder}
                                    disabled={isPosting}
                                >
                                    Confirmar Orden
                                </Button>
                                <Chip
                                    color="error"
                                    label={errorMessage}
                                    sx={{
                                        display: errorMessage ? "flex" : "none",
                                        mt: 2,
                                    }}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default SummaryPage
