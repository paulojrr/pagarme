import { Router } from "express";
import { CreateTransactionUseCase } from "../../../domain/usecases/create-transaction-usecase";
import { GetAvailableTransactionUseCase } from "../../../domain/usecases/get-available-transaction-usecase";
import { GetWaitingFundsTransactionUseCase } from "../../../domain/usecases/get-waiting-funds-transaction-usecase";
import { TransactionPostgresRepository } from "../../repositories/prisma/transaction-repository";
import { validateGetTransaction } from "../validator/middlewares/validate-get-transaction-middleware";
import { validateTransaction } from '../validator/middlewares/validate-transaction-middleware';
import { TransactionController } from "./transaction-controller";

const repository = new TransactionPostgresRepository()
const createTransactionUseCase = new CreateTransactionUseCase(repository)
const getAvailableTransactionUseCase = new GetAvailableTransactionUseCase(repository)
const getWaitingFundsTransactionUseCase = new GetWaitingFundsTransactionUseCase(repository)

const transactionController = new TransactionController(
  createTransactionUseCase,
  getAvailableTransactionUseCase,
  getWaitingFundsTransactionUseCase,
  repository
)

const transactionRoutes = Router();

transactionRoutes.post("/transaction", validateTransaction, (request, response) =>
  transactionController.create(request, response)
);

transactionRoutes.get("/transaction/available", validateGetTransaction, (request, response) =>
  transactionController.getAvailable(request, response)
);

transactionRoutes.get("/transaction/waitingFunds", validateGetTransaction, (request, response) =>
  transactionController.getWaitingFunds(request, response)
);

export { transactionRoutes };
