import { Router } from "express";
import { CreateTransactionUseCase } from "../../../domain/usecases/create-transaction-usecase";
import { TransactionPostgresRepository } from "../../repositories/prisma/transaction-repository";
import { validateTransaction } from '../validator/middlewares/validate-transaction-middleware';
import { TransactionController } from "./transaction-controller";

const repository = new TransactionPostgresRepository()
const useCase = new CreateTransactionUseCase(repository)

const transactionController = new TransactionController(useCase, repository)
const transactionRoutes = Router();

transactionRoutes.post("/transaction", validateTransaction, (request, response) =>  transactionController.create(request, response));

export { transactionRoutes };
