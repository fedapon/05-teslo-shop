import { GetServerSideProps } from "next"
import { Box, Typography } from "@mui/material"
import { ShopLayout } from "@/components/layouts"
import { ProductList } from "@/components/products"
import { dbProducts } from "@/database"
import { IProduct } from "@/interfaces"

interface Props {
    products: IProduct[]
    foundProducts: Boolean
    query: string
}

export default function SearchPage({ products, foundProducts, query }: Props) {
    return (
        <ShopLayout
            title={"Teslo-Shop - Search"}
            pageDescription={"Los mejores productos"}
        >
            <Typography variant="h1" component={"h1"}>
                Buscar producto
            </Typography>
            {foundProducts ? (
                <Typography
                    variant="h2"
                    sx={{ marginBottom: 1 }}
                    textTransform="capitalize"
                >
                    Término: {query}
                </Typography>
            ) : (
                <>
                    <Box display="flex">
                        <Typography variant="h2" sx={{ marginBottom: 1 }}>
                            No encontramos ningún producto
                        </Typography>
                        <Typography
                            variant="h2"
                            sx={{ ml: 1 }}
                            color="secondary"
                            textTransform="capitalize"
                        >
                            {query}
                        </Typography>
                    </Box>
                </>
            )}

            <ProductList products={products} />
        </ShopLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { query = "" } = params as { query: string }

    if (query.length === 0) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        }
    }

    let products = await dbProducts.getProductsByTerm(query)
    const foundProducts = products.length > 0

    if (!foundProducts) {
        //si no encontramos resultados, devolvemos todos
        products = await dbProducts.getAllProducts()
    }

    return {
        props: {
            products,
            foundProducts,
            query,
        },
    }
}
