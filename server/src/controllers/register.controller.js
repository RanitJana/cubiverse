import userSchema from "../models/user.model.js";

const handleRegister = async (req, res, next) => {

    try {
        const { firstName, lastName, contactNumber1, email, password, confirmPassword, address, pincode } = req.body;

        if (!firstName || !lastName || !contactNumber1 || !email || !password || !confirmPassword || !address || !pincode) {
            return res.status(401).json({
                message: "All input fields must be filled!"
            })
        }

        let user = await userSchema.findOne({ email });

        if (password !== confirmPassword) return res.status(401).json({
            message: "Password didn't match."
        })

        if (user) return res.status(403).json({
            message: "Already registered."
        })


        await userSchema.create({
            firstName,
            lastName,
            contactNumber: [contactNumber1],
            email,
            password,
            address: [{ location: address, pincode }]
        })

        return res.status(200).json({
            message: "Registration successfull."
        })

    } catch (error) {

        console.log(`An error occurred :${error}`);

        return res.json(500).json({
            message: "An server error occurred! Please try again."
        })
    }

}

export default handleRegister;
