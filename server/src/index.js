import { } from "dotenv/config"
import connectDB from "./database/index.js";
import handleServer from "./server.js";
import app from "./app.js";

connectDB()
    .then(() => {
        // handleServer(app);
        const port = process.env.PORT || 5000;
        app
            .listen(port, () => {
                console.log(`⚙ Server started at port : ${port}`);
            })
            .on('error', (err) => {
                console.log(`An error occurred in express server : ${err}`);
                throw new Error(err)
            })
    })
    .catch((error) => {
        console.log(`Database connection error : ${error}`);
        throw new Error(error);
    })
