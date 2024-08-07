import userSchema from "../models/user.model.js"
const handleLogOut = async function (req, res) {
    try {

        let user = await userSchema.findById(req.user._id);

        delete user.refreshToken;

        await user.save({ validateBeforeSave: false });

        res.clearCookie("accessToken",{
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        return res.status(200).json({
            message: "Logged out successfully!"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred!"
        })
    }
}

export {
    handleLogOut
}
