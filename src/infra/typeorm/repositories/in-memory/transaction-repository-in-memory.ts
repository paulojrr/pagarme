import { TransactionRepository } from "../../../../domain/interfaces/repositories/transaction-repository";
import { Transaction } from "../../../../domain/usecases/transaction-dto";

export class TransactionPostgresRepositoryInMemory
  implements TransactionRepository
{
  private transactions: Transaction[] = [];

  async create(data: Transaction): Promise<Transaction[]> {
    this.transactions.push(data);
    return [data];
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactions;
  }
}
