import express from "express";
import cookieParsar from "cookie-parser";
import compression from "compression"
import cors from "cors";

const app = express();

//configurations
app.use(compression());
app.use(cors({
    origin: ["https://cubiverse.vercel.app", "http://localhost:5173"],
    credentials: true
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "100kb" }));
app.use(cookieParsar());

//routes
import register from "./routes/register.route.js";
import login from "./routes/login.route.js";
import Product from "./routes/product.route.js";
import user from "./routes/user.route.js";
import faq from "./routes/faq.route.js";
import address from "./routes/address.route.js";
import logOut from "./routes/logout.route.js";
import order from "./routes/order.route.js";
import review from "./routes/review.route.js";

app.get('/', (req, res) => {
    return res.status(200).json({
        success: "Server is running"
    })
})
app.use("/api/v1/register", register);
app.use("/api/v1/login", login);
app.use("/api/v1/product", Product);
app.use("/api/v1/user", user);
app.use("/api/v1/faqs", faq);
app.use("/api/v1/address", address);
app.use("/api/v1/logout", logOut);
app.use("/api/v1/order", order);
app.use("/api/v1/review", review);
app.get("*", (req, res) => {
    res.status(404).json({
        message: "Invalid route"
    })
})
app.post("*", (req, res) => {
    res.status(404).json({
        message: "Invalid route"
    })
})

export default app;