import { TransactionRepository } from "../../../domain/interfaces/repositories/transaction-repository";
import { CreateTransaction, ResponseTransaction } from "../../../domain/usecases/transaction-dto";

export class TransactionPostgresRepositoryInMemory
  implements TransactionRepository {
  private transactions: CreateTransaction[] = [];
  private responseTransactions: ResponseTransaction[] = [];

  async create(data: CreateTransaction): Promise<ResponseTransaction[]> {
    this.transactions.push();

    let responseData = {
      id: '41c21524-0708-493f-9f2e-a3a0938f8338',
      value: data.value,
      cpf: data.cpf,
      description: data.description,
      paymentMethod: data.paymentMethod,
      cardNumber: data.cardNumber.slice(-4),
      cardHolderName: data.cardHolderName,
      validFrom: data.validFrom,
      verificationNumber: data.verificationNumber,
      payablesId: '41c21524-0708-493f-9f2e-a3a0938f8338'
    }

    this.responseTransactions.push(responseData)
    return this.responseTransactions
  }

  async findAll(): Promise<ResponseTransaction[]> {
    return this.responseTransactions
  }

  async findTransactions(cpf: string): Promise<ResponseTransaction[]> {
    return this.responseTransactions.filter((transactions => transactions.cpf === cpf))
  }
}
