import NextLink from "next/link"
import { Chip, Grid, Typography, Link } from "@mui/material"
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid"
import { ShopLayout } from "@/components/layouts"
import { GridRenderCellParams } from "@mui/x-data-grid/models"

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "fullName", headerName: "Nombre Completo", width: 300 },
    {
        field: "paid",
        headerName: "Pagada",
        description: "Muestra información si está pagada la orden",
        width: 200,
        renderCell: (params: GridRenderCellParams) =>
            params.row.paid ? (
                <Chip color="success" label="Pagada" variant="outlined" />
            ) : (
                <Chip color="error" label="No pagada" variant="outlined" />
            ),
    },
    {
        field: "orden",
        headerName: "Ver orden",
        description: "Muestra información si está pagada la orden",
        width: 200,
        sortable: false,
        renderCell: (params: GridRenderCellParams) => (
            <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
                <Link underline="always">Ver orden</Link>
            </NextLink>
        ),
    },
]

const rows = [
    { id: 1, paid: false, fullName: "Fernando Pans" },
    { id: 2, paid: true, fullName: "Fernando Pans" },
    { id: 3, paid: true, fullName: "Fernando Pans" },
    { id: 4, paid: false, fullName: "Julian Durán" },
    { id: 5, paid: false, fullName: "Pedro Pascal" },
]

const HistoryPage = () => {
    return (
        <ShopLayout
            title={"Historial de ordenes"}
            pageDescription={"Historial de ordenes del cliente"}
        >
            <Typography variant="h1" component="h1">
                Historial de ordenes
            </Typography>
            <Grid container>
                <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default HistoryPage
