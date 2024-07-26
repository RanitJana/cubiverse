import express from "express";
import handleAuthVerify from "../middlewares/auth.middleware.js";
import { handleLogOut } from "../controllers/logout.controller.js";
const router = express.Router();

router.post("/", handleAuthVerify, handleLogOut);

export default router;