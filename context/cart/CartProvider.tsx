import { FC, PropsWithChildren, useEffect, useReducer } from "react"
import { ICartProduct } from "@/interfaces"
import { CartContext, cartReducer } from "./"
import Cookies from "js-cookie"

export interface CartState {
    cart: ICartProduct[]
    numberOfItems: number
    subTotal: number
    tax: number
    total: number
}

const CART_INITIAL_STATE: CartState = {
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
}

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

    useEffect(() => {
        try {
            const cookieProducts = Cookies.get("cart")
                ? JSON.parse(Cookies.get("cart")!)
                : []
            dispatch({
                type: "[Cart] - LoadCart from cookies | storage",
                payload: cookieProducts,
            })
        } catch (error) {
            dispatch({
                type: "[Cart] - LoadCart from cookies | storage",
                payload: [],
            })
        }
    }, [])

    useEffect(() => {
        if (state.cart.length > 0)
            Cookies.set("cart", JSON.stringify(state.cart))
    }, [state.cart])

    useEffect(() => {
        const numberOfItems = state.cart.reduce(
            (prev, current) => current.quantity + prev,
            0
        )
        const subTotal = state.cart.reduce(
            (prev, current) => current.quantity * current.price + prev,
            0
        )
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)
        const orderSummary = {
            numberOfItems,
            subTotal,
            tax: subTotal * taxRate,
            total: subTotal * (taxRate + 1),
        }
        dispatch({
            type: "[Cart] - Update order summary",
            payload: orderSummary,
        })
    }, [state.cart])

    const addProductToCart = (product: ICartProduct) => {
        const productInCart = state.cart.some((p) => p._id === product._id)
        if (!productInCart)
            return dispatch({
                type: "[Cart] - Update Products in cart",
                payload: [...state.cart, product],
            })

        const productInCartButDifferentSize = state.cart.some((p) => {
            return p._id === product._id && p.size === product.size
        })
        if (!productInCartButDifferentSize)
            return dispatch({
                type: "[Cart] - Update Products in cart",
                payload: [...state.cart, product],
            })

        const updatedProducts = state.cart.map((p) => {
            if (p._id !== product._id) return p
            if (p.size !== product.size) return p
            p.quantity += product.quantity
            return p
        })
        dispatch({
            type: "[Cart] - Update Products in cart",
            payload: updatedProducts,
        })
    }

    const updateCartQuantity = (product: ICartProduct) => {
        dispatch({ type: "[Cart] - Change Cart Quantity", payload: product })
    }

    const removeCartProduct = (product: ICartProduct) => {
        dispatch({ type: "[Cart] - Remove product in cart", payload: product })
    }

    return (
        <CartContext.Provider
            value={{
                ...state,

                //Methods
                addProductToCart,
                removeCartProduct,
                updateCartQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}