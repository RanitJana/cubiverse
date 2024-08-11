import express from "express";
import { handleProductRequest, handleProductUpload, handleProductAddCart, increaseDecreaseProductCart, handleRemoveFromCart } from "../controllers/product.controller.js";
import handleAuthVerify from "../middlewares/auth.middleware.js";

import upload from "../utils/multer.js";

const router = express.Router();

router
    .post("/user/cart", handleAuthVerify, increaseDecreaseProductCart)
    .post("/cart/erase/:id", handleAuthVerify, handleRemoveFromCart)
    .post("/:product", handleAuthVerify, handleProductAddCart)
    .get("/:product", handleProductRequest)
    .post("/", upload.array('images', 10), handleProductUpload)

export default router;