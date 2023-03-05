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

const OrderPage = () => {
    return (
        <ShopLayout
            title={"Resumen de la orden 12313213"}
            pageDescription={"Resumen de la orden"}
        >
            <Typography variant="h1" component="h1">
                Orden: ABC123
            </Typography>

            {/* <Chip
                sx={{ my: 2 }}
                label="Pendiente de pago"
                variant="outlined"
                color="error"
                icon={<CreditCardOffOutlined />}
            /> */}
            <Chip
                sx={{ my: 2 }}
                label="Orden ya fue pagada"
                variant="outlined"
                color="success"
                icon={<CreditScoreOutlined />}
            />

            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h2">
                                Resumen (3 productos)
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
                            <Typography>Fernando Pans</Typography>
                            <Typography>Algún lugar 123</Typography>
                            <Typography>San Francisco, Córdoba</Typography>
                            <Typography>Argentina</Typography>
                            <Typography>+123456789</Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box display="flex" justifyContent="end">
                                <NextLink href="/cart" passHref legacyBehavior>
                                    <Link underline="always">Editar</Link>
                                </NextLink>
                            </Box>

                            <OrderSummary />

                            <Box sx={{ mt: 3 }}>
                                <h1>Pagar</h1>
                                <Chip
                                    sx={{ my: 2 }}
                                    label="Orden ya fue pagada"
                                    variant="outlined"
                                    color="success"
                                    icon={<CreditScoreOutlined />}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default OrderPage
