import { beforeEach, describe, expect, it, vi } from "vitest";
import { TransactionPostgresRepository } from "../../infra/repositories/prisma/transaction-repository";
import { GetAvailableTransactionUseCase } from "./get-available-transaction-usecase";

describe("GetAvailableTransactionUseCase", () => {
  let repository: TransactionPostgresRepository;
  let useCase: GetAvailableTransactionUseCase;

  beforeEach(async () => {
    repository = new TransactionPostgresRepository();
    useCase = new GetAvailableTransactionUseCase(repository);
  });

  const cpf = "079.430.010-36"

  const transactions = [
    { payables: { value: 97 } },
    { payables: { value: 97 } },
    { payables: { value: 97 } },
    { payables: { value: 97 } },
  ]

  const expectedReturn = {
    "available": 388
  }

  it("should return waiting funds", async () => {
    const transactionSpy = vi.spyOn(repository, "findTransactionsAvailable");
    transactionSpy.mockResolvedValue(transactions);

    const transaction = await useCase.getAvailable(cpf);

    expect(transactionSpy).toHaveBeenCalledOnce();
    expect(transaction).toEqual(expectedReturn);
  });
});
