import { TransactionPostgresRepository } from "../../infra/repositories/prisma/transaction-repository";
import { formatCpf } from "../helper/format-helper";
import { calculateTotalPayables } from "../helper/transaction-helper";

interface ReturnWaitingFunds {
  waitingFunds: number
}

export class GetWaitingFundsTransactionUseCase {
  constructor(
    private readonly transactionPostgresRepository: TransactionPostgresRepository
  ) { }

  async getWaitingFunds(cpf: string): Promise<ReturnWaitingFunds> {
    const formattedCpf = formatCpf(cpf)
    const transactionsWaitingFunds = await this.transactionPostgresRepository.findTransactionsWaitingFunds(formattedCpf)

    const waitingFunds = calculateTotalPayables(transactionsWaitingFunds)

    return { waitingFunds }
  }
}

