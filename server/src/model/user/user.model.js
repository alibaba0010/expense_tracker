import BadRequestError from "../../errors/badRequest.js";
import UnAuthorizedError from "../../errors/unauthorized.js";
import notFoundError from "../../errors/notFound.js";
import User from "./user.mongo.js";

export const comparePassword = (password, confirmPassword) => {
  if (password !== confirmPassword)
    throw new BadRequestError("Password doesn't match");
};
export const requiredFields = (username, email, password, confirmPassword) => {
  if (!username || !email || !password || !confirmPassword)
    throw new BadRequestError("Please fill all required field");
};

export const checkIfExists = async (email) => {
  const checkEmailExist = await User.findOne({ email });

  if (checkEmailExist)
    throw new BadRequestError("Email or username already exists");
};

export const findUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new notFoundError("Unable to get user");
};
