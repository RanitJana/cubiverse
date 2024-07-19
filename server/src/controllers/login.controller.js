import userSchema from "../models/user.model.js";

const handleLogin = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(401).json({
            message: "All fields must be filled"
        });

        let user = await userSchema.findOne({ email });

        if (!user) return res.status(401).json({
            message: "User does not exist"
        })

        if (!(await user.matchPassword(password))) return res.status(401).json({
            message: "Password didn't match"
        })

        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        res.cookie("accessToken", accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            secure: false
        });

        user.refreshToken = refreshToken;

        user.save({ validateBeforeSave: false });

        return res.status(200).json({
            message: "Login successfull!!"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred!Please try again."
        })
    }

}

export default handleLogin;