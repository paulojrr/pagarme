import { TransactionPostgresRepository } from "../../infra/repositories/db/transactionRepository";
import { Transaction } from "./transaction.dto";

export class CreateTransaction {
  constructor(
    private readonly transactionPostgresRepository: TransactionPostgresRepository
  ) {}

  async create(data: Transaction): Promise<Transaction[]> {
    data.cardNumber = data.cardNumber.slice(-4);
    await this.transactionPostgresRepository.create(data);

    const transactions = await this.transactionPostgresRepository.findAll();

    return transactions;
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionPostgresRepository.findAll();
  }
}
