import express from "express";
const router = express.Router();

import handleAuthVerify from "../middlewares/auth.middleware.js";
import { handleGetReview, handlePostReview } from "../controllers/review.controller.js";

import upload from "../utils/multer.js";

router
    .get('/:product', handleGetReview)
    .post('/:product', handleAuthVerify, upload.single('reviewImage'), handlePostReview)

export default router;