import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const transactionSchema = new Schema({
  id: { type: String, default: uuidv4, unique: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["credit", "debit"], required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Transaction = model("Transaction", transactionSchema);

export default Transaction;
