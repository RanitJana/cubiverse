import productSchema from "../models/prodect.model.js";
import uploadAvater from "../utils/cloudinary.js";
import fs from "fs";

const handleProductRequest = async function (req, res) {

    const category = req.params.product;

    let products = null;

    if (category == 'new') products = await productSchema.find({ New: true });
    else if (category == 'most-favourite') {
        products = await productSchema.aggregate([{ $sort: { "ratings.result": -1 } }]).limit(10);
    }
    else if (category == "sale") {
        products = await productSchema.find({ discount: { $gt: 0 } });
    }
    else products = await productSchema.find({ category });

    if (!products) return res.status(400).json({
        message: "No such items are found."
    })

    return res.status(200).json(JSON.stringify(products));
}

const handleProductUpload = async function (req, res) {

    try {
        const { company, stock, category, price, discount, description, specifications, New, name } = req.body;

        let imageURLs = [];

        for (let index = 0; index < req.files.length; index++) {
            let url = await uploadAvater(req.files[index].path, req.files[index].filename);
            fs.unlinkSync(`${req.files[index].path}`);
            imageURLs.push(url);
        }

        let newProduct = await productSchema.create({
            images: imageURLs.map(val => val.secure_url),
            company: company,
            stock: stock,
            category: category,
            price: price,
            discount: discount ? discount : 0,
            description: description,
            specifications: specifications,
            New: New,
            name: name
        })

        return res.status(200).json({
            message: "Product launch successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "An error occurred."
        })
    }

}

export {
    handleProductRequest,
    handleProductUpload
}