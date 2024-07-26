import express from "express";
import handleAuthVerify from "../middlewares/auth.middleware.js"
import { handleAddAddress, handleDeleteAdderss, handleEditAddress } from "../controllers/address.controller.js";
const router = express.Router();

router
    .post('/add', handleAuthVerify, handleAddAddress)
    .post('/delete/:index', handleAuthVerify, handleDeleteAdderss)
    .post('/edit/:index', handleAuthVerify, handleEditAddress)
export default router;