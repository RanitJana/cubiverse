import { Schema, model } from "mongoose";

const productSchema = new Schema(
    {
        name: {
            type: String,
            default: "",
            required: true,
            trim: true,
        },
        images: [
            {
                type: String
            }
        ],
        ratings: {
            count: {
                type: Number,
                default: 0
            },
            result: {
                type: Number,
                default: 0
            }
        },
        company: {
            type: String,
            trim: true,
            required: true
        },
        stock: {
            type: Number,
            required: true,
            default: 0
        },
        category: {
            type: String,
            required: true,
            trim: true
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
        description: {
            type: String,
            trim: true,
            required: true
        },
        specifications: {
            type: String,
            required: true,
            trim: true
        },
        New: {
            type: Boolean,
            required: true,
            default: false
        }

    },
    {
        timestamps: true
    }
);

//indexing of products based on their search parameters improves performance significantly

productSchema
    .index({ ratings: 1 })
    .index({ company: 1 })
    .index({ category: 1 })
    .index({ price: 1 })
    .index({ discount: 1 })

const Product = model("Product", productSchema);

export default Product;