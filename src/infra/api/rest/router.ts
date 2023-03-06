import { Router } from "express";
import { CreateTransaction } from "../../../domain/usecases/createTransaction";
import { TransactionController } from "./transaction-controller";
import { TransactionPostgresRepository } from "../../repositories/db/transactionRepository";

const transactionRepository = new TransactionPostgresRepository();
const createTransaction = new CreateTransaction(transactionPostgresRepository);

const transactionController = new TransactionController(createTransaction);
const router: Router = Router();

router.post("/transaction", transactionController.create);

export { router }
