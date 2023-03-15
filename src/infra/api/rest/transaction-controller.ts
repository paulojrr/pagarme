import { Request, Response } from "express";
import { CreateTransactionUseCase } from "../../../domain/usecases/create-transaction-usecase";
import { TransactionPostgresRepository } from "../../typeorm/repositories/typeorm/transaction-repository";

export class TransactionController {
  async create(request: Request, response: Response) {
    try {
      const transactionPostgresRepository = new TransactionPostgresRepository();
      const createTransaction = new CreateTransactionUseCase(
        transactionPostgresRepository
      );

      await createTransaction.create(request.body);
      const transaction = await transactionPostgresRepository.findAll()

      return response.json(transaction);
    } catch (error) {
      console.log(error);
    }
  }
}
