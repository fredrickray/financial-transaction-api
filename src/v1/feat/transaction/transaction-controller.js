import TransactionService from "./transaction-service.js";

export class TransactionController {
  constructor() {
    this.transactionService = TransactionService;
  }

  /**
   * @route POST api/transaction
   * @desc Create a new transaction.
   * @access Public
   */
  async createTransaction(req, res, next) {
    await this.transactionService.createTransaction(req, res, next);
  }

  async getTransaction(req, res, next) {
    await this.transactionService.getTransactions(req, res, next);
  }
}
