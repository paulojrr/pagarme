import { TransactionEntity } from "../../../domain/entities/Transaction";
import { TransactionRepository } from "../../../domain/interfaces/repositories/Transaction";
import { Transaction } from "../../../domain/usecases/transaction.dto";
import { Connection } from "./connection";
const transactionRepository = Connection.getRepository(TransactionEntity);

export class TransactionPostgresRepository implements TransactionRepository {
  async create(data: Transaction): Promise<Transaction[]> {
    transactionRepository.create(data);

    const transactions = await this.findAll();

    return transactions;
  }

  async findAll(): Promise<Transaction[]> {
    return transactionRepository.find();
  }
}
