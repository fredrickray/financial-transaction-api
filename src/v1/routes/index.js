import { Router } from "express";
import transactionRouter from "../feat/transaction/transaction-routes.js";
import authRouter from "../feat/auth/auth-routes.js";
const router = Router();

router.use("/auth", authRouter);
router.use("/transaction", transactionRouter);

export default router;
