import { TransactionPostgresRepository } from "../../infra/repositories/prisma/transaction-repository";
import { formatCpf } from "../helper/format-helper";
import { calculateTotalPayables } from "../helper/transaction-helper";

interface ReturnAvailable {
  available: number
}

export class GetWaitingFundsTransactionUseCase {
  constructor(
    private readonly transactionPostgresRepository: TransactionPostgresRepository
  ) { }

  async getAvailable(cpf: string): Promise<ReturnAvailable> {
    const formattedCpf = formatCpf(cpf)
    const transactionsAvailable = await this.transactionPostgresRepository.findTransactionsAvailable(formattedCpf)

    const available = calculateTotalPayables(transactionsAvailable)

    return { available }
  }
}

