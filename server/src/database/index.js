import mongoose from "mongoose";

export default async function connectDB() {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/cubeSeller`);
        console.log("Database connection successful!!");
    }
    catch (error) {
        console.log(`An error occurred in DB connection : ${error}`);
        throw new Error(error);
    }
}
