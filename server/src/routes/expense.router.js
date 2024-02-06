import { Router } from "express";

const expenseRouter = Router();
import {
  addExpense,
  addIncome,
  calculateExpense,
  getIncome,
  updateExpense,
  updateIncome,
} from "../controller/expense.controller.js";

expenseRouter
  .post("/income", addIncome)
  .get("/income", getIncome)
  .patch("/income", updateIncome)
  .post("/expense/new", addExpense)
  .patch("/expense", updateExpense)
  .get("/expenses", calculateExpense);

export default expenseRouter;
