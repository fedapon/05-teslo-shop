// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/database"
import { IOrder, IPaypal } from "@/interfaces"
import { Product, Order } from "@/models"
import axios from "axios"
import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"

type Data =
    | {
          message: string
      }
    | IOrder

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    switch (req.method) {
        case "POST":
            return payOrder(req, res)

        default:
            return res.status(400).json({ message: "bad request" })
    }
}
async function payOrder(req: NextApiRequest, res: NextApiResponse<Data>) {
    //todo: validad session usuario orden
    //todo: validar mongoId

    //verfificar sesion del usuario
    // const session: any = await getSession({ req })
    // if (!session) {
    //     return res.status(401).json({ message: "you must be authenticated" })
    // }

    const paypalBearerToken = await getPaypalBearerToken()
    if (!paypalBearerToken) {
        return res
            .status(400)
            .json({ message: "no se puedo confirmar el token de paypal" })
    }

    const { transactionId, orderId } = req.body

    const { data } = await axios.get<IPaypal.PaypalOrderStatusResponse>(
        `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`,
        {
            headers: {
                Authorization: `Bearer ${paypalBearerToken}`,
            },
        }
    )
    if (data.status !== "COMPLETED") {
        return res.status(401).json({ message: "orden no reconocida" })
    }

    await db.connect()
    const dbOrder = await Order.findById(orderId)
    if (!dbOrder) {
        await db.disconnect()
        return res
            .status(400)
            .json({ message: "orden no existe en base de datos" })
    }
    if (dbOrder.total !== Number(data.purchase_units[0].amount.value)) {
        await db.disconnect()
        return res.status(400).json({
            message: "los montos de paypal y nuestra orden no coinciden",
        })
    }
    dbOrder.transactionId = transactionId
    dbOrder.isPaid = true
    await dbOrder.save()
    await db.disconnect()

    return res.status(200).json({ message: "orden pagada" })
}

const getPaypalBearerToken = async (): Promise<string | null> => {
    const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET

    const body = new URLSearchParams("grant_type=client_credentials")
    const base64Token = Buffer.from(
        `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
        "utf-8"
    ).toString("base64")

    try {
        const { data } = await axios.post(
            process.env.PAYPAL_OAUTH_URL || "",
            body,
            {
                headers: {
                    Authorization: `Basic ${base64Token}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        )
        return data.access_token
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response?.data)
        } else {
            console.log(error)
        }
        return null
    }
}
