import userSchema from "../models/user.model.js";

const handleAddAddress = async function (req, res) {
    try {

        const { address, pincode } = req.body;

        if (!address || !pincode) return res.status(403).json({
            message: "All input fields must be filled!"
        })

        let userId = req.user._id;

        let user = await userSchema.findById(userId);

        user.address.push({
            location: address,
            pincode: pincode
        })

        user.save({ validateBeforeSave: false });

        return res.status(200).json({
            message: "New Address added!"
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred!!"
        })
    }
}

const handleDeleteAdderss = async function (req, res) {
    try {
        let user = await userSchema.findById(req.user._id);
        let index = req.params.index;
        user.address.splice(index, 1);
        user.save({ validateBeforeSave: false });

        return res.status(200).json({
            message: "Selected address deleted successfully!"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred!!"
        })
    }
}

const handleEditAddress = async function (req, res) {
    try {

        const { address, pincode } = req.body;

        if (!address || !pincode) {
            return res.status(403).json({
                message: "All input fields must be filled"
            })
        }

        let user = await userSchema.findById(req.user._id);
        let index = req.params.index;

        user.address[index] = {
            location: address,
            pincode: pincode
        }

        user.save({ validateBeforeSave: false });

        return res.status(200).json({
            message: "Choosed adress edited"
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred!!"
        })
    }
}

export {
    handleAddAddress,
    handleDeleteAdderss,
    handleEditAddress
}