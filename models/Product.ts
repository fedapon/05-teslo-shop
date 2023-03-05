import { IProduct } from "@/interfaces"
import mongoose, { Schema, model, Model } from "mongoose"

const productSchema = new Schema(
    {
        description: { type: String, required: true },
        images: [{ type: String }],
        inStock: { type: Number, required: true, default: 0 },
        price: { type: Number, required: true, default: 0 },
        sizes: [
            {
                type: String,
                enum: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
                message: "{VALUE} no es un tamaño válido",
            },
        ],
        slug: { type: String, required: true, unique: true },
        tags: [{ type: String }],
        title: { type: String, required: true },
        type: {
            type: String,
            enum: ["shirts", "pants", "hoodies", "hats"],
            message: "{VALUE} no es un tipo válido",
        },
        gender: {
            type: String,
            enum: ["men", "women", "kid", "unisex"],
            message: "{VALUE} no es un tipo válido",
        },
    },
    { timestamps: true }
)

productSchema.index({ title: "text", tags: "text" })

const Product: Model<IProduct> =
    mongoose.models.Product || model("Product", productSchema)

export default Product
