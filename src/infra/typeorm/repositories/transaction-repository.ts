import { TransactionRepository } from "../../../domain/interfaces/repositories/transaction-repository";
import { Transaction } from "../../../domain/usecases/transaction-dto";
import { typeormDataSource } from "../data-source";
import { TransactionEntity } from "../entities/transaction-entity";

export class TransactionPostgresRepository implements TransactionRepository {
  async create(data: Transaction): Promise<Transaction> {
    return await typeormDataSource.getRepository(TransactionEntity).save(data);
  }

  async findAll(): Promise<Transaction[]> {
    return await typeormDataSource.getRepository(TransactionEntity).find();
  }
}
