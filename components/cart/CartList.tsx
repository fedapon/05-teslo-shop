import NextLink from "next/link"
import {
  Grid,
  Typography,
  Link,
  CardActionArea,
  CardMedia,
  Button,
} from "@mui/material"
import { Box } from "@mui/system"
import { ItemCounter } from "../ui"
import { useContext } from "react"
import { CartContext } from "@/context"
import { ICartProduct, IOrderItem } from "@/interfaces"

interface Props {
  editable?: boolean
  products?: IOrderItem[]
}

export const CartList = ({ editable = false, products }: Props) => {
  const { cart, updateCartQuantity, removeCartProduct } =
    useContext(CartContext)

  const onNewCartQuantity = (
    product: ICartProduct,
    newQuantityValue: number
  ) => {
    product.quantity = newQuantityValue
    updateCartQuantity(product)
  }

  const onRemoveCartProduct = (product: ICartProduct) => {
    removeCartProduct(product)
  }

  const productsToShow = products ? products : cart

  return (
    <>
      {productsToShow.map((product) => (
        <Grid
          container
          spacing={2}
          sx={{ mb: 1 }}
          key={product.slug + product.size}
        >
          <Grid item xs={3}>
            {/* llevar a la página del producto */}
            <NextLink href={`/product/${product.slug}`} passHref legacyBehavior>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={product.image}
                    component="img"
                    sx={{ borderRadius: "5px" }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body1">
                Talla: <strong>{product.size}</strong>
              </Typography>
              {editable ? (
                <ItemCounter
                  currentValue={product.quantity}
                  maxValue={10}
                  updatedQuantity={(value) => {
                    onNewCartQuantity(product as ICartProduct, value)
                  }}
                />
              ) : (
                <Typography variant="h5">
                  {product.quantity}{" "}
                  {product.quantity > 1 ? "productos" : "producto"}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">${product.price}</Typography>
            {editable && (
              <Button
                variant="text"
                color="secondary"
                onClick={() => onRemoveCartProduct(product as ICartProduct)}
              >
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  )
}
