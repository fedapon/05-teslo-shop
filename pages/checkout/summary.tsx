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
} from "@mui/material"
import { ShopLayout } from "@/components/layouts"
import { CartList, OrderSummary } from "@/components/cart"

const SummaryPage = () => {
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
                                <Button
                                    color="secondary"
                                    className="circular-btn"
                                    fullWidth
                                >
                                    Confirmar Orden
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default SummaryPage
