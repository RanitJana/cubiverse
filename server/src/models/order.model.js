import { Schema, model } from "mongoose";

const orderSchema = new Schema(
    {
        customer: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
        discount: {
            type: Number,
            default: 0
        },
        delivaryLocation: {
            type: String,
            required: true,
            trim: true
        },
        state: {
            type: String,
            enum: ["ORDER PLACED", "ORDER SHIPPED"]
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        },
        count: {
            type: Number,
            default: 0
        },
        expireAt: {
            type: Date,
            expires: 25920000 //30day
        }
    },
    {
        timestamps: true
    }
)

orderSchema
    .index({ expireAt: 1 })
    .index({ customer: 1 })

const Order = model("Order", orderSchema);

export default Order;