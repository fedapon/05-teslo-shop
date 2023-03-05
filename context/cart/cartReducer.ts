import { ICartProduct } from "@/interfaces"
import { Product } from "@/models"
import { CartState } from "./CartProvider"

type CartActionType =
    | {
          type: "[Cart] - LoadCart from cookies | storage"
          payload: ICartProduct[]
      }
    | {
          type: "[Cart] - Update Products in cart"
          payload: ICartProduct[]
      }
    | {
          type: "[Cart] - Change Cart Quantity"
          payload: ICartProduct
      }
    | {
          type: "[Cart] - Remove product in cart"
          payload: ICartProduct
      }
    | {
          type: "[Cart] - Update order summary"
          payload: {
              numberOfItems: number
              subTotal: number
              tax: number
              total: number
          }
      }

export const cartReducer = (
    state: CartState,
    action: CartActionType
): CartState => {
    switch (action.type) {
        case "[Cart] - LoadCart from cookies | storage":
            return {
                ...state,
                cart: [...action.payload],
            }
        case "[Cart] - Update Products in cart":
            return {
                ...state,
                cart: [...action.payload],
            }
        case "[Cart] - Change Cart Quantity":
            return {
                ...state,
                cart: state.cart.map((product) => {
                    if (product._id !== action.payload._id) return product
                    if (product.size !== action.payload.size) return product
                    return action.payload
                }),
            }
        case "[Cart] - Remove product in cart":
            return {
                ...state,
                cart: state.cart.filter((product) => {
                    if (product._id !== action.payload._id) return true
                    if (product.size !== action.payload.size) return true
                    return false
                }),
            }

        case "[Cart] - Update order summary":
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state
    }
}
