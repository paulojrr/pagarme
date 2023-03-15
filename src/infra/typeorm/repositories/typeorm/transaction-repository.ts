import { TransactionRepository } from "../../../../domain/interfaces/repositories/transaction-repository";
import { Transaction } from "../../../../domain/usecases/transaction-dto";
import { typeormDataSource } from "../../data-source";
import { TransactionEntity } from "../../entities/transaction-entity";

export class TransactionPostgresRepository implements TransactionRepository {
  async create(data: Transaction): Promise<Transaction[]> {
    const transaction = await typeormDataSource.getRepository(TransactionEntity).save(data);
    return [transaction]
  }

  async findAll(): Promise<Transaction[]> {
    return await typeormDataSource.getRepository(TransactionEntity).find();
  }
}
