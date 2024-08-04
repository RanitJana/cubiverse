import reviewSchema from "../models/review.model.js";
import userSchema from "../models//user.model.js";
import productSchema from "../models/prodect.model.js";
import url from "url";
import uploadAvater from "../utils/cloudinary.js";
import fs from "fs";

async function handleGetReview(req, res) {

    try {

        let productId = req.params.product;

        let myUrl = url.parse(req.url);

        let limit = parseInt(myUrl.query.replace('limit=', ''), 10);

        let totalDocs = await reviewSchema.countDocuments({ product: productId });

        let reviews = await reviewSchema.find({
            product: productId
        }).limit(limit);

        let finalReviews = await Promise.all(
            reviews.map(async review => {
                let userData = await userSchema.findById(review.user);
                let tempReview = {
                    image: review.image,
                    user: `${userData.firstName} ${userData.lastName}`,
                    content: review.content,
                    ratings: review.ratings,
                    createdAt: review.createdAt.toDateString()
                }
                return tempReview;
            })
        );


        return res.status(200).json({
            total: totalDocs,
            reviews: finalReviews
        })

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            message: "An error occurred!!"
        })

    }
}
async function handlePostReview(req, res) {
    try {

        if (!req.body.ratings || !req.body.content || !req.params.product) return res.status(403).json({
            message: "All fields must be filled!"
        })

        let url = (await uploadAvater(req.file.path, req.file.filename)).secure_url;

        fs.unlinkSync(`${req.file.path}`);

        let review = await reviewSchema.create({
            user: req.user._id,
            product: req.params.product,
            ratings: req.body.ratings,
            content: req.body.content,
            image: url
        })

        let productCurrent = await productSchema.findById(req.params.product);

        productCurrent.ratings.count = parseInt(productCurrent.ratings.count) + 1;
        productCurrent.ratings.result = parseInt(productCurrent.ratings.result) + parseInt(req.body.ratings);

        productCurrent.save({ validateBeforeSave: false });

        return res.status(200).json({
            message: "Reviewed product succesfully!"
        })

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            message: "An error occurred!!"
        })

    }
}

export {
    handleGetReview,
    handlePostReview
}