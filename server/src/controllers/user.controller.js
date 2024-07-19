import userSchema from "../models/user.model.js";
import jwt from "jsonwebtoken";

async function handleUserData(req, res) {
    let data = {
        "firstName": req.user["firstName"],
        "lastName": req.user["lastName"],
        "contactNumber": req.user["contactNumber"],
        "address": req.user["address"],
        "cart": req.user["cart"],
        "orderHistory": req.user["orderHistory"],
    }
    return res.status(200).json({
        user: data
    })
}

export default handleUserData;