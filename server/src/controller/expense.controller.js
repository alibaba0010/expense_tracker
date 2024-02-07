import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/badRequest.js";
import User from "../model/user/user.mongo.js";
import NotFoundError from "../errors/notFound.js";

export const addIncome = async (req, res) => {
  const { name, value } = req.body;
  const { userId } = req.user;
  if (typeof name !== "string")
    throw new BadRequestError("Name must be a string.");
  if (!name || !value || isNaN(value))
    throw new BadRequestError("Invalid Input");
  const user = await User.findById(userId).select("-password");
  if (!user) throw new NotFoundError("User not found.");
  user.income = {
    name,
    value,
  };
  await user.save();

  res.status(StatusCodes.CREATED).json({ income: user.income });
};

export const getIncome = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findById(userId);
  return await res.status(StatusCodes.OK).json({
    income: user.income,
  });
};
export const updateIncome = async (req, res) => {
  const { name, value } = req.body;
  const { userId } = req.user;
  const user = await User.findById(userId).select("-password");
  if (!user) throw new NotFoundError("Please login in");
  if (typeof name !== "string")
    throw new BadRequestError("Name must be a string.");
  if (!name || !value || isNaN(value))
    throw new BadRequestError("Invalid Input");
  if (user.income.length === 5)
    throw new UnAuthorizedError("Unable to add new incomes");
  const newIncome = { name, value };
  user.income.push(newIncome);

  await user.save();

  return res
    .status(StatusCodes.OK)
    .json({ msg: "Income updated successfully" });
};
export const addExpense = async (req, res) => {};
export const updateExpense = async (req, res) => {};
export const calculateExpense = async (req, res) => {};
