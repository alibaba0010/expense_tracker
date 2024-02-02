import express, { json } from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import cors from "cors";
import rateLimit from "express-rate-limit";
import userRouter from "./routes/user.router.js";
import orderRouter from "./routes/order.router.js";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import dotenv from "dotenv";
import { errorHandler } from "./errors/error.js";
import { routeError } from "./errors/route.error.js";
dotenv.config();

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
const app = express();
app
  .use(cors())
  .use(json())
  .use(limiter)
  .use(
    cookieSession({
      signed: false,
      secure: false, //process.env.NODE_ENV !== "test"
      maxAge: 24 * 60 * 60 * 1000,
    })
  ) // 24 hours
  .use("/products", express.static((__dirname, "./uploads")))
  .use("/v1", userRouter)
  .use("/v1", orderRouter)
  .use("/v1/products", productRouter)
  .use("/v1", cartRouter)
  .use("/", express.static("public"))

  .use(routeError)
  .use(errorHandler);

export default app;

//   cors({
//     origin: ["http://localhost:3000", "https://pinvent-app.vercel.app"],
//     credentials: true,
//   })
