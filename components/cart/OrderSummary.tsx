import { Grid, Typography } from "@mui/material"

export const OrderSummary = () => {
    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography>No. Productuos</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="end">
                <Typography>3</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Subtotal</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="end">
                <Typography>${`155.66`}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Impuestos (15%)</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="end">
                <Typography>${`52.33`}</Typography>
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
                <Typography variant="subtitle1">${`200.63`}</Typography>
            </Grid>
        </Grid>
    )
}
