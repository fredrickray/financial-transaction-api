import { Router } from "express";
import { TransactionController } from "./transaction-controller.js";
import newTransactionValidator from "../../../validations/transaction-validation.js";
import { requireAuth } from "../../../middlewares/authMiddleware.js";

const transactionRouter = Router();
const transactionController = new TransactionController();

transactionRouter
  .route("/")
  .post(
    requireAuth,
    newTransactionValidator,
    transactionController.createTransaction.bind(transactionController)
  )
  .get(
    requireAuth,
    transactionController.getTransactions.bind(transactionController)
  );

transactionRouter
  .route("/:id")
  .get(
    requireAuth,
    transactionController.getTransactionId.bind(transactionController)
  );

export default transactionRouter;
