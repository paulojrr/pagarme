import { beforeEach, describe, expect, it, vi } from "vitest";
import { GetWaitingFundsTransactionUseCase } from "./get-waiting-funds-transaction-usecase";

describe("GetWaitingFundsTransactionUseCase", () => {
  const repositoryMock = {
    findTransactionsWaitingFunds: vi.fn()
  }

  let useCase = new GetWaitingFundsTransactionUseCase(repositoryMock as any);

  beforeEach(() => {
    vi.clearAllMocks()
  });

  it("should return available balance when funds exist", async () => {
    const cpf = "111.111.111-11";
    const transactionsFunds = [{ payables: { value: 100 } }, { payables: { value: 200 } }];
    const expectedFunds = 300;

    repositoryMock.findTransactionsWaitingFunds.mockResolvedValue(transactionsFunds);

    const result = await useCase.getWaitingFunds(cpf);

    expect(repositoryMock.findTransactionsWaitingFunds).toHaveBeenCalledWith(cpf);
    expect(result.waitingFunds).toEqual(expectedFunds);
  });

  it("should return 0 when no transactions exist", async () => {
    const cpf = "222.222.222-22";
    const transactionsAvailable: any = [];
    const expectedFunds = 0;

    repositoryMock.findTransactionsWaitingFunds.mockResolvedValue(transactionsAvailable);

    const result = await useCase.getWaitingFunds(cpf);

    expect(repositoryMock.findTransactionsWaitingFunds).toHaveBeenCalledWith(cpf);
    expect(result.waitingFunds).toEqual(expectedFunds);
  });
});
