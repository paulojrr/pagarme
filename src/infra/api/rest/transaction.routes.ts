import { Router } from "express";
import { Transaction } from '../../../domain/entities/transaction';
import { validationMiddleware } from '../validator/middlewares/validatorMiddleware';
import { TransactionController } from "./transaction-controller";

const transactionController = new TransactionController()
const transactionRoutes = Router();

transactionRoutes.post("/transaction", validationMiddleware(Transaction), transactionController.create);

export { transactionRoutes };
