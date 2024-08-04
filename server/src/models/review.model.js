import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        },
        ratings: {
            type: Number,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        image: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

reviewSchema
    .index({ product: 1, ratings: 1 })

const Review = model("Review", reviewSchema);

export default Review;