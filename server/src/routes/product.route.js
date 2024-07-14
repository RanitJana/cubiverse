import express from "express";
import { handleProductRequest, handleProductUpload } from "../controllers/product.controller.js";

import upload from "../utils/multer.js";

const router = express.Router();

router
    .get("/:product", handleProductRequest)
    .post("/", upload.array('images', 5), handleProductUpload)

export default router;