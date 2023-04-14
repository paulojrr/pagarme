import { TransactionPostgresRepository } from "../../infra/repositories/prisma/transaction-repository";
import {
  calculatePayablesWithFee,
  calculatePaymentDate,
  checkPaymentStatus
} from "../helper/transaction-helper";
import { CreateTransaction, ResponseTransaction } from "./transaction-dto";

export class CreateTransactionUseCase {
  constructor(
    private readonly transactionPostgresRepository: TransactionPostgresRepository
  ) { }

  async create(data: CreateTransaction): Promise<ResponseTransaction[]> {
    const { paymentMethod,
      value,
      cardHolderName,
      verificationNumber,
      cpf,
      description,
      validFrom,
      cardNumber } = data;

    const status = checkPaymentStatus(paymentMethod);
    const fee = calculatePayablesWithFee(paymentMethod, value);
    const paymentDate = calculatePaymentDate(paymentMethod);

    const payables = {
      cardHolderName,
      verificationNumber,
      cpf,
      description,
      paymentMethod,
      validFrom,
      value,
      cardNumber: cardNumber.slice(-4),
      payables: {
        paymentDate,
        value: fee,
        status
      }
    };
    return await this.transactionPostgresRepository.create(payables);
  }
}

