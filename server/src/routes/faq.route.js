import express from "express";
const router = express.Router();
import { getFaq, postFaq } from "../controllers/faq.controller.js";

router
    .get("/", getFaq)
    .post("/", postFaq)

export default router;