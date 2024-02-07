import pkg, { Types } from "mongoose";
const { Schema, model } = pkg;
import dotenv from "dotenv";
dotenv.config();

const ExpenseSchema = new Schema({
  user: {
    type: Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export default model("Expense", ExpenseSchema);
