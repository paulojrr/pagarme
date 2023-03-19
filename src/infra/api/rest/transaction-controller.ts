import { Request, Response } from "express";
import { CreateTransactionUseCase } from "../../../domain/usecases/create-transaction-usecase";
import { TransactionPostgresRepository } from "../../repositories/prisma/transaction-repository";

export class TransactionController {
  constructor(
    private readonly createTransaction: CreateTransactionUseCase,
    private readonly transactionRepository: TransactionPostgresRepository
  ) { }

  async create(request: Request, response: Response) {
    try {
      await this.createTransaction.create(request.body);
      const transaction = await this.transactionRepository.findAll();

      return response.json(transaction);
    } catch (error: any) {
      console.log(error);
      return response.status(400).json({ message: error.message });
    }
  }
}
