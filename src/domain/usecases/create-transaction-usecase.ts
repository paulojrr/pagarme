import { TransactionPostgresRepository } from "../../infra/typeorm/repositories/typeorm/transaction-repository";
import { Transaction } from "./transaction-dto";

export class CreateTransactionUseCase {
  constructor(
    private readonly transactionPostgresRepository: TransactionPostgresRepository
  ) {}

  async create(data: Transaction): Promise<Transaction[]> {
    data.cardNumber = data.cardNumber.slice(-4);
    return await this.transactionPostgresRepository.create(data);
  }
}
