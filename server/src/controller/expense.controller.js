import BadRequestError from "../errors/badRequest.js";
import Expense from "../model/expense/expense.mongo.js";

export const addIncome = async (req, res) => {
  const { name, value } = req.body;
  console.log(value(isNaN));
  if (!name || !value || value(isNaN))
    throw new BadRequestError("Invalid Input");

  res.status(StatusCodes.CREATED).json({ name, value });
};

export const getIncome = async (req, res) => {};
export const updateIncome = async (req, res) => {};
export const addExpense = async (req, res) => {};
export const updateExpense = async (req, res) => {};
export const calculateExpense = async (req, res) => {};
