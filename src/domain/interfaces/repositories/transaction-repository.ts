import { CreateTransaction, ResponseTransaction, ResponseTransactionPayables } from "../../usecases/transaction-dto";

export interface TransactionRepository {
  create(data: CreateTransaction): Promise<ResponseTransaction[]>;
  findAll(): Promise<ResponseTransaction[]>;
  findTransactionsAvailable(cpf: string): Promise<ResponseTransactionPayables[]>;
  findTransactionsWaitingFunds(cpf: string): Promise<ResponseTransactionPayables[]>;
}
