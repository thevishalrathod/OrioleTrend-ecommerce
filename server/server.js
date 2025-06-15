import express from "express";
import "./db_connection.js";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

//Middlewares - related to app
app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

/*----------Midleware for end point routing----------*/

/*
 *Auth Router
 */
import AuthRouter from "./routes/auth/AuthRoutes.js";
app.use("/api/auth", AuthRouter);

/*
 *Common Feature Router
 */
import CommonFeatureRouter from "./routes/common/FeatureRoutes.js";
app.use("/api/common/feature", CommonFeatureRouter);

/**
 *Admin Product Router
 */
import adminProductRouter from "./routes/admin/ProductsRoutes.js";
app.use("/api/admin/products", adminProductRouter);

/**
 *Admin Order Router
 */
import adminOrderRouter from "./routes/admin/OrdersRoutes.js";
app.use("/api/admin/orders", adminOrderRouter);

/*
 *Shopping Product Router
 */
import ShopProductsRouter from "./routes/shop/ShopProductsRoutes.js";
app.use("/api/shop/products", ShopProductsRouter);

/*
 *Shopping cart Router
 */
import ShopCartRouter from "./routes/shop/CartRoutes.js";
app.use("/api/shop/cart", ShopCartRouter);

/*
 *Shopping address Router
 */
import ShopAddressRouter from "./routes/shop/AddressRoutes.js";
app.use("/api/shop/address", ShopAddressRouter);

/*
 *Shopping order Router
 */
import ShopOrderRouter from "./routes/shop/OrderRoutes.js";
app.use("/api/shop/order", ShopOrderRouter);

/*
 *Shopping search Router
 */
import ShopSearchRouter from "./routes/shop/SearchRoutes.js";
app.use("/api/shop/search", ShopSearchRouter);

/*
 *Shopping review Router
 */
import ShopReviewRouter from "./routes/shop/ReviewRoutes.js";
app.use("/api/shop/review", ShopReviewRouter);

app.listen(PORT, () => {
  console.log(`Server is now live on http://localhost:${PORT}`);
});
