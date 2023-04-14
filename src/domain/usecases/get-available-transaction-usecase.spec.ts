import { beforeEach, describe, expect, it, vi } from "vitest";
import { GetAvailableTransactionUseCase } from "./get-available-transaction-usecase";

describe("GetAvailableTransactionUseCase", () => {
  const repositoryMock = {
    findTransactionsAvailable: vi.fn()
  }

  let useCase = new GetAvailableTransactionUseCase(repositoryMock as any);

  beforeEach(() => {
    vi.clearAllMocks()
  });

  it("should return available balance when transactions exist", async () => {
    const cpf = "111.111.111-11";
    const transactionsAvailable = [{ payables: { value: 100 } }, { payables: { value: 200 } }];
    const expectedAvailable = 300;

    repositoryMock.findTransactionsAvailable.mockResolvedValue(transactionsAvailable);

    const result = await useCase.getAvailable(cpf);

    expect(repositoryMock.findTransactionsAvailable).toHaveBeenCalledWith(cpf);
    expect(result.available).toEqual(expectedAvailable);
  });

  it("should return 0 when no transactions exist", async () => {
    const cpf = "222.222.222-22";
    const transactionsAvailable: any = [];
    const expectedAvailable = 0;

    repositoryMock.findTransactionsAvailable.mockResolvedValue(transactionsAvailable);

    const result = await useCase.getAvailable(cpf);

    expect(repositoryMock.findTransactionsAvailable).toHaveBeenCalledWith(cpf);
    expect(result.available).toEqual(expectedAvailable);
  });
});
