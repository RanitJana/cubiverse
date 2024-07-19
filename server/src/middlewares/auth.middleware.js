import userSchema from "../models/user.model.js";
import jwt from "jsonwebtoken";

async function handleAuthVerify(req, res, next) {
    try {

        let accessToken = req.cookies.accessToken;

        if (!accessToken) return res.status(401).json({
            message: "Unauthorized user. Please login in first."
        })

        let verifyToken = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        let user = await userSchema.findById(verifyToken._id);

        if (!user) return res.status(403).json({
            message: "Please register first."
        })

        req.user = user;

        return next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred!!"
        })
    }
}

export default handleAuthVerify;