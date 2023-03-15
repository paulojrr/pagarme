import { Router } from "express";
import { Transaction } from '../../../domain/entities/transaction';
import { validateMiddleware } from '../validator/middlewares/validatorMiddleware';
import { TransactionController } from "./transaction-controller";

const transactionController = new TransactionController()
const transactionRoutes = Router();

transactionRoutes.post("/transaction", validateMiddleware(Transaction), transactionController.create);

export { transactionRoutes };
