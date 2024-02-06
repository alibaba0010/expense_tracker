import express, { json } from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import cors from "cors";
import rateLimit from "express-rate-limit";
import userRouter from "./routes/user.router.js";
import expenseRouter from "./routes/expense.router.js";
import dotenv from "dotenv";
import { errorHandler } from "./errors/error.js";
import { routeError } from "./errors/route.error.js";
dotenv.config();

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
  .use("/api", userRouter)
  .use("/api", expenseRouter)

  .use(routeError)
  .use(errorHandler);

export default app;
