import { Transaction } from "../../usecases/transaction-dto";

export interface TransactionRepository {
  create(data: Transaction): Promise<Transaction>;
  findAll(data: Transaction): Promise<Transaction[]>;
}
