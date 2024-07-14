import { } from "dotenv/config"
import connectDB from "./database/index.js";
import handleServer from "./server.js";
import app from "./app.js";

connectDB()
    .then(() => {
        handleServer(app);
    })
    .catch((error) => {
        console.log(`Database connection error : ${error}`);
        throw new Error(error);
    })
