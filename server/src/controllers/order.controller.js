
import userSchema from "../models/user.model.js";
import orderSchema from "../models/order.model.js";

async function handleOrder(req, res) {
    try {

        let user = await userSchema.findById(req.user._id);

        let { address, payment, cartItems } = req.body;

        const orderPromises = await cartItems.map(async (cube, index) => {

            let order = await orderSchema.create({
                delivaryLocation: address,
                customer: req.user._id,
                price: cube.price,
                discount: cube.discount,
                payment: payment,
                state: "ORDER PLACED",
                product: cube._id,
                count: user.cart[index].count
            });

            user.orderHistory.unshift({
                product: cube._id,
                finalPrice: Math.floor(cube.price - Math.floor(cube.price * cube.discount / 100)),
                state: "ORDER PLACED",
                orderedDate: new Date(),
                count: order.count
            });
            // await user.save({ validateBeforeSave: false });
        });

        await Promise.all(orderPromises);

        user.cart = [];

        await user.save({ validateBeforeSave: false });

        return res.status(200).json({
            message: "Ordered Placed Successfully!"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred!!"
        })
    }
}

export {
    handleOrder
}