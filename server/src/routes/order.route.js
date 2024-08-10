import express from "express";
import handleAuthVerify from "../middlewares/auth.middleware.js";
import { handleOrder, handleOrderCancel } from "../controllers/order.controller.js";

const router = express.Router();

router
    .post("/", handleAuthVerify, handleOrder)
    .post("/:productId/:productMain/:count", handleAuthVerify, handleOrderCancel)

export default router;