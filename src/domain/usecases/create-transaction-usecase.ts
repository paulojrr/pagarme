import { TransactionPostgresRepository } from "../../infra/repositories/prisma/transaction-repository";
import { CreateTransaction, ResponseTransaction } from "./transaction-dto";

export class CreateTransactionUseCase {
  constructor(
    private readonly transactionPostgresRepository: TransactionPostgresRepository
  ) { }

  async create(data: CreateTransaction): Promise<ResponseTransaction[]> {
    data.cardNumber = data.cardNumber.slice(-4);

    const status = data.paymentMethod === 'debit_card' ? 'paid' : 'waiting_funds'

    const date = new Date()
    const value = data.paymentMethod === 'debit_card' ? data.value * 0.3 : data.value * 0.5

    const paymentDate = data.paymentMethod === 'debit_card' ? date : new Date(date.setDate(date.getDate() + 30))
    const payables = {
      ...data,
      payables: {
        value,
        status,
        paymentDate
      }
    }

    return await this.transactionPostgresRepository.create(payables)
  }
};
