import "dotenv/config";
import mongoose from "mongoose";
import TransactionService from "../v1/feat/transaction/transaction-service.js";
import Transaction from "../v1/feat/transaction/transaction-model.js";

describe("Transaction Service", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL, {});
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await Transaction.deleteMany({});
  });

  describe("createTransaction", () => {
    it("should create a new transaction", async () => {
      const req = {
        body: {
          amount: 100,
          type: "credit",
          description: "Test transaction",
          date: "2024-08-08T07:35:12.398Z",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await TransactionService.createTransaction(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: "Transaction recorded successfully",
          data: {
            transaction: expect.objectContaining({
              amount: 100,
              type: "credit",
              description: "Test transaction",
              date: new Date("2024-08-08T07:35:12.398Z"),
            }),
          },
        })
      );
    });

    it("should throw an error if payload is missing", async () => {
      const req = {
        body: {},
      };
      const res = {};
      const next = jest.fn();

      await TransactionService.createTransaction(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("getTransactionById", () => {
    it("should retrieve a transaction by ID", async () => {
      const transaction = new Transaction({
        amount: 100,
        type: "credit",
        description: "Test transaction",
        date: "2024-08-08T07:35:12.398Z",
      });
      await transaction.save();

      const req = {
        params: {
          id: transaction._id,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await TransactionService.getTransactionById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          transaction: expect.objectContaining({
            amount: 100,
            type: "credit",
            description: "Test transaction",
            date: new Date("2024-08-08T07:35:12.398Z"),
          }),
        })
      );
    });

    it("should throw an error if transaction is not found", async () => {
      const req = {
        params: {
          id: "nonexistent-id",
        },
      };
      const res = {};
      const next = jest.fn();

      await TransactionService.getTransactionById(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("getTransactions", () => {
    it("should retrieve transactions with pagination and filtering", async () => {
      await Transaction.insertMany([
        {
          amount: 100,
          type: "credit",
          description: "Test transaction 1",
          date: "2024-08-08T07:35:12.398Z",
        },
        {
          amount: 200,
          type: "debit",
          description: "Test transaction 2",
          date: "2024-08-07T07:35:12.398Z",
        },
      ]);

      const req = {
        query: {
          type: "credit",
          startDate: "2024-08-01",
          endDate: "2024-08-08",
          page: 1,
          limit: 10,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await TransactionService.getTransactions(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: "Transactions retrieved successfully",
          data: expect.any(Array),
          meta: expect.objectContaining({
            totalItems: 1,
            totalPages: 1,
            currentPage: 1,
            pageSize: 10,
          }),
        })
      );
    });

    it("should throw an error if no transactions found", async () => {
      const req = {
        query: {
          type: "nonexistent-type",
        },
      };
      const res = {};
      const next = jest.fn();

      await TransactionService.getTransactions(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
