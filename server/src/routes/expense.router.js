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
  .post("/expense/new", authenticateUser, verifyUser, addExpense)
  .patch("/expense", authenticateUser, verifyUser, updateExpense)
  .get("/expenses", calculateExpense);

export default expenseRouter;
