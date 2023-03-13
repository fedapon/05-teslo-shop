import { CartContext } from "@/context"
import { IOrder } from "@/interfaces"
import { currency } from "@/utils"
import { Grid, Typography } from "@mui/material"
import { useContext } from "react"

interface Props {
    order?: IOrder
}

export const OrderSummary = ({ order }: Props) => {
    let { numberOfItems, subTotal, tax, total } = useContext(CartContext)
    if (order) {
        numberOfItems = order.numberOfItems
        subTotal = order.subTotal
        tax = order.tax
        total = order.total
    }

    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography>No. Productos</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="end">
                <Typography>{numberOfItems}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Subtotal</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="end">
                <Typography>{currency.format(subTotal)}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>
                    Impuestos (
                    {`${Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%`})
                </Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="end">
                <Typography>{currency.format(tax)}</Typography>
            </Grid>

            <Grid item xs={6} sx={{ mt: 2 }}>
                <Typography variant="subtitle1">Total:</Typography>
            </Grid>
            <Grid
                item
                xs={6}
                sx={{ mt: 2 }}
                display="flex"
                justifyContent="end"
            >
                <Typography variant="subtitle1">
                    {currency.format(total)}
                </Typography>
            </Grid>
        </Grid>
    )
}
