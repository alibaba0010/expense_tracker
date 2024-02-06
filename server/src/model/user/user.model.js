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

export const checkIfExists = async (email, username) => {
  const checkEmailExist = await User.findOne({ email });
  const checkUsernameExist = await User.findOne({ username });

  if (checkEmailExist || checkUsernameExist)
    throw new BadRequestError("Email or username already exists");
};

export const checkAdmin = async (userId) => {
  const user = await User.findById(userId);

  if (user.isAdmin !== true)
    throw new UnAuthorizedError("Only admin is ascessible");
};

export const findUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new notFoundError("Unable to get user");
};
export const checkValue = async (value) => {
  // Regular expression to check if the value is an email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let result;
  if (emailRegex.test(value)) {
    result = await User.findOne({ email: value });
  } else {
    result = await User.findOne({ username: value });
  }
  if (!result) throw new BadRequestError("Unable to find user");
  return result;
};
