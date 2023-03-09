import { ICartProduct } from "@/interfaces"
import { createContext } from "react"
import { IShippingAddress } from "./CartProvider"

interface ContextProps {
    isLoaded: boolean
    cart: ICartProduct[]
    numberOfItems: number
    subTotal: number
    tax: number
    total: number

    shippingAddress?: IShippingAddress

    //Methods
    addProductToCart: (product: ICartProduct) => void
    updateCartQuantity: (product: ICartProduct) => void
    removeCartProduct: (product: ICartProduct) => void
    updateAddress: (address: IShippingAddress) => void
}

export const CartContext = createContext({} as ContextProps)
