import { Schema, model } from "mongoose";

const faqSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        },
        question: {
            type: String,
            trim: true
        },
        answer: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true

    }
)

faqSchema.index({ product: 1 });

const Faq = model("Faq", faqSchema);

export default Faq;