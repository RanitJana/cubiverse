import express from "express";
import cookieParsar from "cookie-parser";
import compression from "compression"
import cors from "cors";

const app = express();

//configurations
app.use(compression());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "100kb" }));
app.use(cookieParsar());

//routes
import register from "./routes/register.route.js";
import login from "./routes/login.route.js";
import Product from "./routes/product.route.js";

app.use("/api/v1/register", register);
app.use("/api/v1/login", login);
app.use("/api/v1/product", Product);


export default app;