import { IProduct } from "@/interfaces"
import useSWR, { SWRConfiguration } from "swr"

// const fetcher = (...args: [ket: string]) =>
//     fetch(...args).then((res) => res.json())

export const useProduct = (url: string, config: SWRConfiguration = {}) => {
    // const { data, error, isLoading } = useSWR<IProduct[]>(`/api${url}`, fetcher, config)
    const { data, error, isLoading } = useSWR<IProduct[]>(`/api${url}`, config)

    return {
        products: data || [],
        isLoading,
        isError: error,
    }
}
