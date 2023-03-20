import { CreateTransaction, ResponseTransaction } from "../../usecases/transaction-dto";

export interface TransactionRepository {
  create(data: CreateTransaction): Promise<ResponseTransaction[]>;
  findAll(): Promise<ResponseTransaction[]>;
}
