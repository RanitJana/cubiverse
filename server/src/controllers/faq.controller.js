import faqSchema from "../models/faq.model.js";
// import productSchema from "../models/prodect.model.js";
import url from "url";

const getFaq = async function (req, res) {

    try {

        const myUrl = url.parse(req.url);

        let [tempProductId, tempLimit, tempPage] = myUrl.query.split('&');

        let productId = tempProductId.replace('product=', '');
        let limit = parseInt(tempLimit.replace('limit=', ''));
        let page = parseInt(tempPage.replace('page=', ''));

        let faqs = await faqSchema.find({ product: productId }).skip((page - 1) * limit).limit(limit);
        let pages = Math.ceil((await faqSchema.countDocuments({ product: productId })) / limit);
        return res.status(200).json({
            faqs,
            pages: pages
        });

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            message: "An error occurred!"
        })
    }
}

const postFaq = async function (req, res) {
    try {

        const { question, answer } = req.body;

        if (!question) return res.status(403).json({
            message: "Question must be asked"
        })

        const myUrl = url.parse(req.url);

        let productId = myUrl.query.replace('product=', '');


        let newFaq = await faqSchema.create({
            product: productId,
            question: question,
            answer: answer ? answer : ""
        })

        return res.status(200).json({
            message: "Faq Added!"
        })

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred!"
        })
    }
}

export {
    getFaq,
    postFaq
}