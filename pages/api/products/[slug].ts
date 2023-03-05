// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/database"
import { IProduct } from "@/interfaces"
import { Product } from "@/models"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = { message: string } | IProduct

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    switch (req.method) {
        case "GET":
            return getProductBySlug(req, res)

        default:
            return res.status(400).json({ message: "bad request" })
    }
}
const getProductBySlug = async (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) => {
    const { slug } = req.query
    await db.connect()
    const product = await Product.findOne({ slug }).lean()
    await db.disconnect()

    if (!product) return res.status(400).json({ message: "bad request" })
    return res.status(200).json(product)
}
