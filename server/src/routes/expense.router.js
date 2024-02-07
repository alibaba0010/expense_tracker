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
import { authenticateUser, verifyUser } from "../middleware/auth.js";

expenseRouter
  .post("/income", authenticateUser, verifyUser, addIncome)
  .get("/income", authenticateUser, verifyUser, getIncome)
  .patch("/income/update", authenticateUser, verifyUser, updateIncome)
  .post("/expense/new", addExpense)
  .patch("/expense", updateExpense)
  .get("/expenses", calculateExpense);

export default expenseRouter;
