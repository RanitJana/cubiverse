import express from "express";
import handleRegister from "../controllers/register.controller.js";

const router = express.Router();

router.post('/', handleRegister);

export default router;