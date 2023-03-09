import { Request, Response } from "express";
import { CreateTransactionUseCase } from "../../../domain/usecases/create-transaction-usecase";
import { TransactionPostgresRepository } from "../../typeorm/repositories/transaction-repository";

export class TransactionController {
  async create(request: Request, response: Response) {
    const transactionPostgresRepository = new TransactionPostgresRepository();
    const createTransaction = new CreateTransactionUseCase(
      transactionPostgresRepository
    );

    const transaction = await createTransaction.create(request.body);

    return response.json(transaction);
  }
}
