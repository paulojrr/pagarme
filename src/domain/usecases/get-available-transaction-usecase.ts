import { TransactionPostgresRepository } from "../../infra/repositories/prisma/transaction-repository";
import { formatCpf } from "../helper/format-helper";

interface ReturnAvailable {
  available: number
}

export class GetAvailableTransactionUseCase {
  constructor(
    private readonly transactionPostgresRepository: TransactionPostgresRepository
  ) { }

  async getAvailable(cpf: string): Promise<ReturnAvailable> {
    const formattedCpf = formatCpf(cpf)
    const transactionsAvailable = await this.transactionPostgresRepository.findTransactionsAvailable(formattedCpf)

    const available = transactionsAvailable.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.payables.value
    }, 0)

    return { available }
  }
};
