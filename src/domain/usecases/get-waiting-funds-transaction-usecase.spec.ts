import { beforeEach, describe, expect, it, vi } from "vitest";
import { TransactionPostgresRepository } from "../../infra/repositories/prisma/transaction-repository";
import { GetWaitingFundsTransactionUseCase } from "./get-waiting-funds-transaction-usecase";

describe("GetWaitingFundsTransactionUseCase", () => {
  let repository: TransactionPostgresRepository;
  let useCase: GetWaitingFundsTransactionUseCase;

  beforeEach(async () => {
    repository = new TransactionPostgresRepository();
    useCase = new GetWaitingFundsTransactionUseCase(repository);
  });

  const cpf = "079.430.010-36"

  const transactions = [
    { payables: { value: 95 } },
    { payables: { value: 95 } },
    { payables: { value: 95 } },
    { payables: { value: 95 } },
  ]

  const expectedReturn = {
    "waitingFunds": 380
  }

  it("should return waiting funds", async () => {
    const transactionSpy = vi.spyOn(repository, "findTransactionsWaitingFunds");
    transactionSpy.mockResolvedValue(transactions);

    const transaction = await useCase.getWaitingFunds(cpf);

    expect(transactionSpy).toHaveBeenCalledOnce();
    expect(transaction).toEqual(expectedReturn);
  });
});
