// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db, SHOP_CONSTANTS } from "@/database"
import { IProduct } from "@/interfaces"
import { Product } from "@/models"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = { message: string } | IProduct[]

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    switch (req.method) {
        case "GET":
            return searchProducts(req, res)

        default:
            return res.status(400).json({ message: "bad request" })
    }
}
const searchProducts = async (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) => {
    let { q = "" } = req.query
    if (q.length === 0) return res.status(400).json({ message: "bad request" })

    q = q.toString().toLocaleLowerCase()
    await db.connect()
    const products = await Product.find({ $text: { $search: q } })
        .select("title images price inStock slug -_id")
        .lean()
    await db.disconnect()

    return res.status(200).json(products)
}
