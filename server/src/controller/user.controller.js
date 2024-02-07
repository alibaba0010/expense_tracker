import { StatusCodes } from "http-status-codes";
import User from "../model/user/user.mongo.js";
import BadRequestError from "../errors/badRequest.js";
import notFoundError from "../errors/notFound.js";
import UnAuthenticatedError from "../errors/unaunthenticated.js";
import {
  checkIfExists,
  comparePassword,
  findUser,
  requiredFields,
} from "../model/user/user.model.js";

import dotenv from "dotenv";
import UnAuthorizedError from "../errors/unauthorized.js";
dotenv.config();

// CREATE NEW USER
export async function httpAddNewUser(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  comparePassword(password, confirmPassword);

  requiredFields(name, email, password, confirmPassword);

  await checkIfExists(email);

  const user = await User.create({ name, email, password });
  res
    .status(StatusCodes.CREATED)
    .json({ name: user.name, email: user.email, id: user._id });
}
//USER LOGIN
export async function httpLogin(req, res) {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequestError("Provide a name or email and password");
  const user = await User.findOne({ email });
  const comparePassword = await user.comparePassword(password);
  if (!comparePassword) throw new UnAuthenticatedError("Invalid Password");
  const token = await user.createJWT();
  req.session = {
    jwt: token,
  };
  res.status(StatusCodes.OK).json({ id: user.id, name: user.name });
}

// SHOW CURRENT USER
export const showCurrentUser = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findById(userId);
  if (!user) throw new notFoundError("Unable to get User");

  const { name, id, email, isAdmin } = user;

  return res.status(StatusCodes.OK).json({ name, id, email, isAdmin });
};

// LOGOUT USER
export const logOutUser = async (req, res) => {
  const { userId } = req.user;
  await findUser(userId);

  req.session = null;
  return res.status(StatusCodes.OK).json({ msg: "Successfully logged out" });
};
