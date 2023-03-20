import { TransactionRepository } from "../../../domain/interfaces/repositories/transaction-repository";
import { CreateTransaction, ResponseTransaction } from "../../../domain/usecases/transaction-dto";
import { prisma } from "./prisma-client";

export class TransactionPostgresRepository implements TransactionRepository {
  async create(data: CreateTransaction): Promise<ResponseTransaction[]> {
    const transaction = await prisma.transaction.create({
      data: {
        value: data.value,
        description: data.description,
        paymentMethod: data.paymentMethod,
        cardNumber: data.cardNumber,
        cardHolderName: data.cardHolderName,
        validFrom: data.validFrom,
        verificationNumber: data.verificationNumber,
        payables: {
          create: {
            value: data.payables.value,
            status: data.payables.status,
            paymentDate: data.payables.paymentDate
          }
        }
      }
    });
    return [transaction];
  }

  async findAll(): Promise<ResponseTransaction[]> {
    return await prisma.transaction.findMany();
  }
}
