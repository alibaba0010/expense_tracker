import BadRequestError from "../errors/badRequest.js";
import Expense from "../model/expense/expense.mongo.js";

export const addIncome = async (req, res) => {
  const { income } = req.body;
  if (!income || income(isNaN)) throw new BadRequestError("Invalid Input");
  res.status(StatusCodes.CREATED).json({ income });
};

export const getIncome = async (req, res) => {};
export const updateIncome = async (req, res) => {};
export const addExpense = async (req, res) => {};
export const updateExpense = async (req, res) => {};
export const calculateExpense = async (req, res) => {};
