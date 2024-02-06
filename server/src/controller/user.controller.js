import { StatusCodes } from "http-status-codes";
import User from "../model/user/user.mongo.js";
import BadRequestError from "../errors/badRequest.js";
import notFoundError from "../errors/notFound.js";
import UnAuthenticatedError from "../errors/unaunthenticated.js";
import {
  checkAdmin,
  checkIfExists,
  comparePassword,
  findUser,
  requiredFields,
  checkValue,
} from "../model/user/user.model.js";

import dotenv from "dotenv";
import UnAuthorizedError from "../errors/unauthorized.js";
dotenv.config();

// CREATE NEW USER
export async function httpAddNewUser(req, res) {
  const { username, email, password, confirmPassword } = req.body;

  comparePassword(password, confirmPassword);

  requiredFields(username, email, password, confirmPassword);

  await checkIfExists(email, username);

  const user = await User.create({ username, email, password });
  res
    .status(StatusCodes.CREATED)
    .json({ username: user.username, email: user.email, id: user._id });
}
//USER LOGIN
export async function httpLogin(req, res) {
  const { value, password } = req.body;
  if (!value || !password)
    throw new BadRequestError("Provide a username or email and password");
  const user = await checkValue(value);
  const comparePassword = await user.comparePassword(password);
  if (!comparePassword) throw new UnAuthenticatedError("Invalid Password");
  const token = await user.createJWT();
  req.session = {
    jwt: token,
  };
  res.status(StatusCodes.OK).json({ id: user.id, username: user.username });
}

// SHOW CURRENT USER
export const showCurrentUser = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findById(userId);
  if (!user) throw new notFoundError("Unable to get User");

  const { username, id, email, isAdmin } = user;

  return res.status(StatusCodes.OK).json({ username, id, email, isAdmin });
};

// LOGOUT USER
export const logOutUser = async (req, res) => {
  const { userId } = req.user;
  await findUser(userId);

  req.session = null;
  return res.status(StatusCodes.OK).json({ msg: "Successfully logged out" });
};
