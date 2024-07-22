import { Schema, model } from "mongoose";

const faqSchema = new Schema(
    {
        product: {
            type: String
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