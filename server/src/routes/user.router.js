import { Router } from "express";
import {
  httpAddNewUser,
  httpLogin,
  logOutUser,
  showCurrentUser,
} from "../controller/user.controller.js";
import { authenticateUser, verifyUser } from "../middleware/auth.js";
const userRouter = Router();
userRouter
  .post("/users/register", httpAddNewUser)
  .post("/users/login", httpLogin)
  .get("/user", authenticateUser, verifyUser, showCurrentUser)
  .get("/users/logout", authenticateUser, verifyUser, logOutUser);

export default userRouter;
