import { FC, PropsWithChildren, useEffect, useReducer } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { AuthContext, authReducer } from "./"
import { IUser } from "@/interfaces"
import { tesloApi } from "@/api"
import { useRouter } from "next/router"

export interface AuthState {
    isLoggedIn: boolean
    user?: IUser
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter()
    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)

    const loginUser = async (
        email: string,
        password: string
    ): Promise<boolean> => {
        try {
            const { data } = await tesloApi.post("/user/login", {
                email,
                password,
            })
            const { token, user } = data
            Cookies.set("token", token)
            dispatch({ type: "[Auth] - Login", payload: user })
            return true
        } catch (error) {
            return false
        }
    }

    const logoutUser = () => {
        Cookies.remove("token")
        Cookies.remove("cart")
        router.reload()
    }

    const registerUser = async (
        name: string,
        email: string,
        password: string
    ): Promise<{
        hasError: boolean
        message?: string
    }> => {
        try {
            const { data } = await tesloApi.post("/user/register", {
                name,
                email,
                password,
            })
            const { token, user } = data
            Cookies.set("token", token)
            dispatch({ type: "[Auth] - Login", payload: user })
            return {
                hasError: false,
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response?.data,
                }
            }
            return {
                hasError: true,
                message: "No se pudo crear el usuario - intente de nuevo",
            }
        }
    }

    useEffect(() => {
        checkToken()
    }, [])

    const checkToken = async () => {
        try {
            if (!Cookies.get("token")) return
            const { data } = await tesloApi.get("/user/validate-token")
            const { token: newToken, user } = data
            Cookies.set("token", newToken)
            dispatch({ type: "[Auth] - Login", payload: user })
            return {
                hasError: false,
            }
        } catch (error) {
            Cookies.remove("token")
        }
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                // Methods
                loginUser,
                logoutUser,
                registerUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
