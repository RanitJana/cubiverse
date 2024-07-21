import express from "express";
import { handleProductRequest, handleProductUpload, handleProductAddCart, increaseDecreaseProductCart } from "../controllers/product.controller.js";
import handleAuthVerify from "../middlewares/auth.middleware.js";

import upload from "../utils/multer.js";

const router = express.Router();

router
    .post("/user/cart", handleAuthVerify, increaseDecreaseProductCart)
    .post("/:product", handleAuthVerify, handleProductAddCart)
    .get("/:product", handleProductRequest)
    .post("/", upload.array('images', 5), handleProductUpload)

export default router;