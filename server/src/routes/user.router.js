import { Router } from "express";
import {} from "../controller/user.controller.js";
import {
   // authenticateUser,
   // verifyAdmin,
   // verifyUser,
 } from "../middleware/auth.js";
const userRouter = Router()
userRouter.post("/user")
export default userRouter