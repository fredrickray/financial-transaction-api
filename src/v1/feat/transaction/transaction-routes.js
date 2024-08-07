import { Router } from "express";
import { TransactionController } from "./transaction-controller.js";

const transactionRouter = Router();
const transactionController = new TransactionController();

transactionRouter
  .route("/")
  .post(transactionController.createTransaction.bind(transactionController));

export default transactionRouter;
