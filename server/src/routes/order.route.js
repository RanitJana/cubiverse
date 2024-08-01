import express from "express";
import handleAuthVerify from "../middlewares/auth.middleware.js";
import { handleOrder } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", handleAuthVerify, handleOrder);

export default router;