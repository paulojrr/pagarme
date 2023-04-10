import { TransactionPostgresRepository } from "../../infra/repositories/prisma/transaction-repository";
import { calculateFee, calculatePaymentDate, checkPaymentStatus } from "../helper/transaction-helper";
import { CreateTransaction, ResponseTransaction } from "./transaction-dto";

export class CreateTransactionUseCase {
  constructor(
    private readonly transactionPostgresRepository: TransactionPostgresRepository
  ) { }

  async create(data: CreateTransaction): Promise<ResponseTransaction[]> {
    const { paymentMethod, value } = data

    const status = checkPaymentStatus(paymentMethod)
    const fee = calculateFee(paymentMethod, value)
    const paymentDate = calculatePaymentDate(paymentMethod)

    const payables = {
      cardHolderName: data.cardHolderName,
      verificationNumber: data.verificationNumber,
      cpf: data.cpf,
      description: data.description,
      paymentMethod: data.paymentMethod,
      validFrom: data.validFrom,
      value: data.value,
      cardNumber: data.cardNumber.slice(-4),
      payables: {
        paymentDate,
        value: fee,
        status
      }
    };
    return await this.transactionPostgresRepository.create(payables)
  }
}
