import { GetServerSideProps } from "next"
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
import { ShopLayout } from "@/components/layouts"
import { CartList, OrderSummary } from "@/components/cart"
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material"
import { getSession } from "next-auth/react"
import { dbOrders } from "@/database"
import { IOrder } from "@/interfaces"
import { countries } from "@/utils"

interface Props {
    order: IOrder
}

const OrderPage = ({ order }: Props) => {
    const { shippingAddress } = order
    return (
        <ShopLayout
            title={"Resumen de la orden"}
            pageDescription={"Resumen de la orden"}
        >
            <Typography variant="h1" component="h1">
                Orden: {order._id}
            </Typography>

            {order.isPaid ? (
                <Chip
                    sx={{ my: 2 }}
                    label="Orden ya fue pagada"
                    variant="outlined"
                    color="success"
                    icon={<CreditScoreOutlined />}
                />
            ) : (
                <Chip
                    sx={{ my: 2 }}
                    label="Pendiente de pago"
                    variant="outlined"
                    color="error"
                    icon={<CreditCardOffOutlined />}
                />
            )}

            <Grid container className="fadeIn">
                <Grid item xs={12} sm={7}>
                    <CartList products={order.orderItems} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h2">
                                Resumen ({order.numberOfItems} producto/s)
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
                                {shippingAddress.firstName}{" "}
                                {shippingAddress.lastName}
                            </Typography>
                            <Typography>{shippingAddress.address}</Typography>
                            <Typography>{shippingAddress.address2}</Typography>
                            <Typography>
                                {shippingAddress.city}, {shippingAddress.zip}
                            </Typography>
                            <Typography>
                                {
                                    countries.find(
                                        (c) =>
                                            c.code === shippingAddress.country
                                    )?.name
                                }
                            </Typography>
                            <Typography>{shippingAddress.phone}</Typography>

                            <Divider sx={{ my: 1 }} />

                            <OrderSummary order={order} />

                            <Box
                                sx={{ mt: 3 }}
                                display="flex"
                                flexDirection="column"
                            >
                                {order.isPaid ? (
                                    <Chip
                                        sx={{ my: 2 }}
                                        label="Orden ya fue pagada"
                                        variant="outlined"
                                        color="success"
                                        icon={<CreditScoreOutlined />}
                                    />
                                ) : (
                                    <h1>Pagar</h1>
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({
    req,
    query,
}) => {
    const { id = "" } = query
    const session: any = await getSession({ req })
    if (!session) {
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${id}`,
                permanent: false,
            },
        }
    }
    const order = await dbOrders.getOrderById(id.toString())
    if (!order) {
        return {
            redirect: {
                destination: `/orders/history`,
                permanent: false,
            },
        }
    }
    if (order.user !== session.user._id) {
        return {
            redirect: {
                destination: `/orders/history`,
                permanent: false,
            },
        }
    }
    return {
        props: {
            order,
        },
    }
}

export default OrderPage
