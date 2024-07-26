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
import user from "./routes/user.route.js";
import faq from "./routes/faq.route.js";
import address from "./routes/address.route.js";
import logOut from "./routes/logout.route.js";

app.use("/api/v1/register", register);
app.use("/api/v1/login", login);
app.use("/api/v1/product", Product);
app.use("/api/v1/user", user);
app.use("/api/v1/faqs", faq);
app.use("/api/v1/address", address);
app.use("/api/v1/logout", logOut);

export default app;