import {
  InvalidInput,
  ResourceNotFound,
} from "../../../middlewares/errorHandler.js";
import Transaction from "./transaction-model.js";

class TransactionService {
  static async createTransaction(req, res, next) {
    try {
      const reqBody = req.body;
      if (!reqBody) {
        throw new InvalidInput("Payload required");
      }

      const transaction = new Transaction(reqBody);
      await transaction.save();

      const resPayload = {
        success: true,
        message: "Transaction recoreded successfully",
        data: transaction,
      };
      res.status(200).json(resPayload);
    } catch (error) {
      next(error);
    }
  }

  static async getTransactionById(req, res, next) {
    try {
      const transactionId = req.params.id;
      const transaction = await Transaction.findOne({ _id: transactionId });
      if (!transaction) {
        throw new ResourceNotFound("Transaction not found");
      }

      const resPayload = {
        success: true,
        message: "Transaction retrieved successfully",
        transaction,
      };
      res.status(200).json(resPayload);
    } catch (error) {
      next(error);
    }
  }

  static async getTransactions(req, res, next) {
    try {
      const { type, startDate, endDate, page = 1, limit = 10 } = req.query;
      let query = {};

      if (type) {
        query.type = type;
      }

      if (startDate || endDate) {
        query.date = {};
        if (startDate) {
          // Converting startDate to the beginning of the day (00:00:00.000)
          query.date.$gte = new Date(new Date(startDate).setHours(0, 0, 0, 0));
        }
        if (endDate) {
          // Convert endDate to the end of the day (23:59:59.999)
          query.date.$lte = new Date(
            new Date(endDate).setHours(23, 59, 59, 999)
          );
        }
      }

      const pageNumber = parseInt(page, 10);
      const pageSize = parseInt(limit, 10);
      const skip = (pageNumber - 1) * pageSize;

      const totalTransactions = await Transaction.countDocuments(query);
      const transactions = await Transaction.find(query)
        .skip(skip)
        .limit(pageSize);

      if (transactions.length === 0) {
        throw new ResourceNotFound("No transactions found");
      }

      const totalPages = Math.ceil(totalTransactions / pageSize);

      const resPayload = {
        success: true,
        message: "Transactions retrieved successfully",
        data: transactions,
        meta: {
          totalItems: totalTransactions,
          totalPages: totalPages,
          currentPage: pageNumber,
          pageSize: pageSize,
        },
      };
      res.status(200).json(resPayload);
    } catch (error) {
      next(error);
    }
  }
}

export default TransactionService;
