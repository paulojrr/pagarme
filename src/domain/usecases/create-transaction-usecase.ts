import { TransactionPostgresRepository } from "../../infra/repositories/prisma/transaction-repository";
import { calculateFee, calculatePaymentDate, checkPaymentStatus } from "../helper/transaction-helper";
import { CreateTransaction, ResponseTransaction } from "./transaction-dto";

export class CreateTransactionUseCase {
  constructor(
    private readonly transactionPostgresRepository: TransactionPostgresRepository
  ) { }

  async create(data: CreateTransaction): Promise<ResponseTransaction[]> {
    let { cardNumber, paymentMethod, value } = data
    cardNumber = cardNumber.slice(-4);

    const status = checkPaymentStatus(paymentMethod)
    const fee = calculateFee(paymentMethod, value)
    const paymentDate = calculatePaymentDate(paymentMethod)

    const payables = {
      ...data,
      payables: {
        value: fee,
        status,
        paymentDate
      }
    }

    return await this.transactionPostgresRepository.create(payables)
  }
};
