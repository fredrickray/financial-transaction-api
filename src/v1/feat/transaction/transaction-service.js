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
        data: {
          transaction,
        },
      };
      res.status(200).json(resPayload);
    } catch (error) {
      next(error);
    }
  }

  static async getTransactionById(id) {
    return await Transaction.findOne({ id });
  }

  static async getTransactions(req, res, next) {
    try {
      const { type, date } = req.query;
      let query = {};

      if (type) {
        query.type = type;
      }

      if (date) {
        query.date = date;
      }

      const hasFilters = Object.keys(query).length > 0;
      const transaction = hasFilters
        ? await Transaction.find(query)
        : await Transaction.find();

      if (!transaction) {
        throw new ResourceNotFound("No transactions found");
      }

      const resPayload = {
        success: true,
        message: "Transactions retrieved successfully",
        data: {
          transaction,
        },
      };
      res.status(200).json(resPayload);
    } catch (error) {
      next(error);
    }
  }
}

export default TransactionService;
