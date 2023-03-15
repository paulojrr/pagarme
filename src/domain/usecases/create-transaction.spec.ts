import { beforeEach, describe, expect, it, vi } from "vitest";
import { TransactionRepository } from "../../domain/interfaces/repositories/transaction-repository";
import { TransactionPostgresRepositoryInMemory } from "../../infra/typeorm/repositories/in-memory/transaction-repository-in-memory";
import { CreateTransactionUseCase } from "./create-transaction-usecase";

vi.mock('typeorm', () => ({
  getRepository: vi.fn().mockReturnValue(new TransactionPostgresRepositoryInMemory()),
}));

describe("create transaction", () => {
  let repository: TransactionRepository;
  let useCase: CreateTransactionUseCase;

  beforeEach(async () => {
    repository = new TransactionPostgresRepositoryInMemory();
    useCase = new CreateTransactionUseCase(repository);
  });

  const validFrom = new Date("2020-01-01T00:00:00Z");

  const payloadMock = {
    value: 100.0,
    description: "Test",
    paymentMethod: "credit_card",
    cardNumber: "4006604842674066",
    cardHolderName: "John Doe",
    validFrom,
    verificationNumber: "123",
  };

  const payloadReturn = {
    value: 100.0,
    description: "Test",
    paymentMethod: "credit_card",
    cardNumber: "4066",
    cardHolderName: "John Doe",
    validFrom,
    verificationNumber: "123",
  };

  it("should create and return a transaction", async () => {
    const transactionSpy = vi.spyOn(useCase, "create");
    const transaction = await  useCase.create(payloadMock)

    expect(transactionSpy).toHaveBeenCalledOnce();
    expect(transaction).toContainEqual(payloadReturn);
  });
});
