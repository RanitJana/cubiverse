import productSchema from "../models/prodect.model.js";
import userSchema from "../models/user.model.js";
import uploadAvater from "../utils/cloudinary.js";
import fs from "fs";
import url from "url";

const handleProductRequest = async function (req, res) {

    const category = req.params.product;

    let products = null;

    if (category == 'id') {
        const myUrl = url.parse(req.url);

        products = await productSchema.findById(myUrl.query.replace('product=', ''));
        return res.status(200).json(JSON.stringify(products));
    }

    if (category == 'new') products = await productSchema.find({ New: true });

    else if (category == "bestsellers") {

        let ratio = 50; // for the time being let this be fixed

        products = await productSchema.find({ "ratings.count": { $gt: ratio } })
    }

    else if (category == 'most-favourite') {

        let limitValue = null;

        if (req.cookies.limit) limitValue = Number(req.cookies.limit);
        else limitValue = 20;

        products = await productSchema.aggregate([{ $sort: { "ratings.result": -1 } }]).limit(limitValue);

        if (req.cookies.limit) res.clearCookie("limit");
    }
    else if (category == "sale") {

        products = await productSchema.find({ discount: { $gt: 0 } });
    }
    else if (category == "all") {
        let count = await productSchema.countDocuments();
        products = await productSchema.aggregate([{ $sample: { size: count } }])
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

async function handleProductAddCart(req, res) {
    try {

        const id = req.user._id;

        let user = await userSchema.findById(id);

        let getIndexProduct = user.cart.findIndex(value => value.productId.toString() === req.params.product.toString());

        let product = await productSchema.findById(req.params.product);
        if (product.stock) {

            if (getIndexProduct === -1) {

                user.cart.push(
                    {
                        productId: req.params.product,
                        count: 1
                    }
                );
                product.stock--;
            }
            else {
                user.cart[getIndexProduct].count++;
                product.stock--;
            }

            user.save({ validateBeforeSave: false });
            product.save({ validateBeforeSave: false });

            return res.status(200).json({
                message: "Added successfully."
            })
        }
        else return res.status(403).json({
            message: "Product out of stock"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred!!"
        })
    }
}

async function handleRemoveFromCart(req, res) {

    try {
        const productId = req.params.id;

        const product = await productSchema.findById(productId);

        if (!product) return res.status(403).json({
            message: "product not found"
        })

        const user = await userSchema.findById(req.user._id);

        user.cart = user.cart.filter(products => products.productId.toString() !== productId.toString());

        user.save({ validateBeforeSave: false });

        return res.status(200).json({
            message: "Successfully deleted the item"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred!!"
        })
    }
}

async function increaseDecreaseProductCart(req, res) {
    try {

        let user = await userSchema.findById(req.user._id);

        let productId = req.body.productId;

        let productIndex = user.cart.findIndex(value => value.productId.toString() === productId.toString());

        let operation = req.body.operation;

        let product = await productSchema.findById(productId);

        if (operation == '-') {
            if (user.cart[productIndex].count == 0) return res.status(403).json({
                message: 'Product cannot be counted as negetive!!.'
            })

            user.cart[productIndex].count--;
            product.stock++;
        }
        else {
            if (product.stock == 0) return res.status(403).json({
                message: 'Out of Stock.'
            })

            user.cart[productIndex].count++;
            product.stock--;
        }

        user.save({ validateBeforeSave: false });
        product.save({ validateBeforeSave: false });

        return res.status(200).json({
            message: "Succesfull.",
            price: product.price,
            offer: product.discount
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occerred!!"
        })
    }
}

export {
    handleProductRequest,
    handleProductUpload,
    handleProductAddCart,
    increaseDecreaseProductCart,
    handleRemoveFromCart
}