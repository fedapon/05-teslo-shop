import { ShopLayout } from "@/components/layouts"
import { Typography } from "@mui/material"

import { ProductList } from "@/components/products"
import { useProduct } from "@/hooks"
import { FullScreenLoading } from "@/components/ui"

export default function KidsPage() {
    const { products, isLoading } = useProduct("/products?gender=kid")

    return (
        <ShopLayout
            title={"Teslo-Shop - Kids"}
            pageDescription={"Los mejores productos"}
        >
            <Typography variant="h1" component={"h1"}>
                Tienda
            </Typography>
            <Typography variant="h2" sx={{ marginBottom: 1 }}>
                Todos los productos
            </Typography>

            {isLoading ? (
                <FullScreenLoading />
            ) : (
                <ProductList products={products} />
            )}
        </ShopLayout>
    )
}
