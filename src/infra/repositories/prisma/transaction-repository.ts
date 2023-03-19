import { TransactionRepository } from "../../../domain/interfaces/repositories/transaction-repository";
import { Transaction } from "../../../domain/usecases/transaction-dto";
import { prisma } from "./prisma-client";

export class TransactionPostgresRepository implements TransactionRepository {
  async create(data: Transaction): Promise<Transaction[]> {
    const transaction = await prisma.transaction.create({ data });
    return [transaction];
  }

  async findAll(): Promise<Transaction[]> {
    return await prisma.transaction.findMany();
  }
}
