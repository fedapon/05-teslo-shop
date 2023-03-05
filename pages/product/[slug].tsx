import { GetStaticPaths, GetStaticProps } from "next"
import { Box, Button, Chip, Grid, Typography } from "@mui/material"
import { ShopLayout } from "@/components/layouts"
import { ProductSizeSelector, ProductSlideShow } from "@/components/products"
import { ItemCounter } from "@/components/ui"
import { IProduct } from "@/interfaces"
import { dbProducts } from "@/database"

interface Props {
    product: IProduct
}

const ProductPage = ({ product }: Props) => {
    // const router = useRouter()
    // const { products: product, isLoading } = useProduct(
    //     `/products/${router.query.slug}`
    // )

    return (
        <ShopLayout title={product.title} pageDescription={product.description}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={7}>
                    <ProductSlideShow images={product.images} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Box display={"flex"} flexDirection="column">
                        {/* titulos */}
                        <Typography variant="h1" component="h1">
                            {product.title}
                        </Typography>
                        <Typography variant="subtitle1" component="h1">
                            ${product.price}
                        </Typography>
                        {/* cantidad */}
                        <Box sx={{ marginY: 2 }}>
                            <Typography variant="subtitle2">
                                Cantidad
                            </Typography>
                            <ItemCounter />
                            <ProductSizeSelector
                                // selectedSize={product.sizes[0]}
                                sizes={product.sizes}
                            />
                            {/* agregar al carrito */}
                            <Button color="secondary" className="circular-btn">
                                Agregar al carrito
                            </Button>
                            {/* <Chip
                                label="No hay disponibles"
                                color="error"
                                variant="outlined"
                            /> */}
                            {/* description */}
                            <Box sx={{ mt: 3 }}>
                                <Typography variant="subtitle2">
                                    Descripción
                                </Typography>
                                <Typography variant="body2">
                                    {product.description}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const productSlugs = await dbProducts.getAllProductsSlugs()

    return {
        paths: productSlugs.map(({ slug }) => ({
            params: {
                slug,
            },
        })),
        fallback: "blocking",
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug = "" } = params as { slug: string }
    const product = await dbProducts.getProductsBySlug(slug)

    if (!product) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        }
    }

    return {
        props: {
            product,
        },
        revalidate: 3600,
    }
}

//NO USAR SSR
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//     const { slug = "" } = params as { slug: string }
//     const product = await dbProducts.getProductsBySlug(slug)

//     if (!product) {
//         return {
//             redirect: {
//                 destination: "/",
//                 permanent: false,
//             },
//         }
//     }
//     return {
//         props: {
//             product,
//         },
//     }
// }

export default ProductPage
