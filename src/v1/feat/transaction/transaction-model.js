import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const transactionSchema = new Schema({
  id: { type: String, default: uuidv4, unique: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["credit", "debit"], required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

transactionSchema.methods.toJSON = function () {
  const transaction = this;
  const transactionObject = transaction.toObject();

  delete transactionObject.__v;
  delete transactionObject.id;

  return transactionObject;
};

const Transaction = model("Transaction", transactionSchema);

export default Transaction;
