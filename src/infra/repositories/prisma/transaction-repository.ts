import { TransactionRepository } from "../../../domain/interfaces/repositories/transaction-repository";
import { CreateTransaction, ResponseTransaction, TransactionPayables } from "../../../domain/usecases/transaction-dto";
import { prisma } from "./prisma-client";

export class TransactionPostgresRepository implements TransactionRepository {
  async create(data: CreateTransaction): Promise<ResponseTransaction[]> {
    const transaction = await prisma.transaction.create({
      data: {
        value: data.value,
        cpf: data.cpf,
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

  async findTransactionsAvailable(cpf: string): Promise<TransactionPayables[]> {
    return await prisma.transaction.findMany({
      select: {
        payables: {
          select: { value: true },
        },
      },
      where: {
        cpf,
        payables: { status: 'paid' },
      },
    })
  }

  async findTransactionsWaitingFunds(cpf: string): Promise<TransactionPayables[]> {
    return await prisma.transaction.findMany({
      select: {
        payables: {
          select: { value: true },
        },
      },
      where: {
        cpf,
        payables: { status: 'waiting_funds' },
      }
    })
  }
}
