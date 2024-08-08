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

  /**
   * @route GET api/transaction/:id
   * @desc Get a transanction.
   * @access Public
   */
  async getTransactionId(req, res, next) {
    await this.transactionService.getTransactionById(req, res, next);
  }

  /**
   * @route GET api/transaction
   * @desc Get all transanctions.
   * @access Public
   */
  async getTransactions(req, res, next) {
    await this.transactionService.getTransactions(req, res, next);
  }
}
