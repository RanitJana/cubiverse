import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        contactNumber: [

            {
                type: Number,
                default: 0
            }
        ],
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            trim: true
        },
        address: [
            {
                location: {
                    type: String
                },
                pincode: {
                    type: Number
                }
            }
        ],
        cart: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        },
        orderHistory: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "Product"
                },
                finalPrice: {
                    type: Number
                },
                state: {
                    type: String,
                    enum: ["CANCELLED", "DELIVERED"],
                    default: "DELIVERED"
                },
                orderedDate: {
                    type: Date,
                    required: [true, "obviously user orderd it!!"]
                },
                arrived: {
                    type: Date
                },
                count: {
                    type: Number,
                    default: 1
                }
            }
        ],
        accessToken: {
            type: String
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);

    return next();

})

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = async function () {

    return await jwt.sign(
        {
            _id: this._id,
            avatar: this.avatar,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )

}

userSchema.methods.generateRefreshToken = async function () {
    return await jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

const User = model("User", userSchema);

export default User;