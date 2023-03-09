import { TransactionPostgresRepository } from "../../infra/typeorm/repositories/transaction-repository";
import { Transaction } from "./transaction-dto";

export class CreateTransactionUseCase {
  constructor(
    private readonly transactionPostgresRepository: TransactionPostgresRepository
  ) {}

  async create(data: Transaction): Promise<Transaction> {
    data.cardNumber = data.cardNumber.slice(-4);
    return await this.transactionPostgresRepository.create(data);
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionPostgresRepository.findAll();
  }
}
