import { CreateTransaction, ResponseTransaction, TransactionPayables } from "../../usecases/transaction-dto";

export interface TransactionRepository {
  create(data: CreateTransaction): Promise<ResponseTransaction[]>;
  findAll(): Promise<ResponseTransaction[]>;
  findTransactionsAvailable(cpf: string): Promise<TransactionPayables[]>;
  findTransactionsWaitingFunds(cpf: string): Promise<TransactionPayables[]>;
}
