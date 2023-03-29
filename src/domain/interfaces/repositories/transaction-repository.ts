import { CreateTransaction, ResponseTransaction, ResponseTransactionAvailable } from "../../usecases/transaction-dto";

export interface TransactionRepository {
  create(data: CreateTransaction): Promise<ResponseTransaction[]>;
  findAll(): Promise<ResponseTransaction[]>;
  findTransactionsAvailable(cpf: string): Promise<ResponseTransactionAvailable[]>;
  findTransactionsWaitingFunds(cpf: string): Promise<ResponseTransaction[]>;
}
