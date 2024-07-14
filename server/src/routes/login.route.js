import express from "express";
import handleLogin from "../controllers/login.controller.js";

const router = express.Router();

router.post("/", handleLogin);

export default router;