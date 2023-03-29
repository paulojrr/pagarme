import { beforeEach, describe, expect, it, vi } from "vitest";
import { TransactionRepository } from "../../domain/interfaces/repositories/transaction-repository";
import { TransactionPostgresRepositoryInMemory } from "../../infra/repositories/in-memory/transaction-repository-in-memory";
import { calculatePaymentDate } from "../helper/transaction-helper";
import { CreateTransactionUseCase } from "./create-transaction-usecase";

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
    cpf: "079.430.010-36",
    description: "Test",
    paymentMethod: "credit_card",
    cardNumber: "4006604842674066",
    cardHolderName: "John Doe",
    validFrom,
    verificationNumber: "123",
    payables: {
      value: 100,
      status: "waiting_funds",
      paymentDate: calculatePaymentDate('credit_card')
    }
  };

  const payloadReturn = {
    id: '41c21524-0708-493f-9f2e-a3a0938f8338',
    value: 100.0,
    cpf: "079.430.010-36",
    description: "Test",
    paymentMethod: "credit_card",
    cardNumber: "4066",
    cardHolderName: "John Doe",
    validFrom,
    verificationNumber: "123",
    payablesId: '41c21524-0708-493f-9f2e-a3a0938f8338'
  };

  it("should create and return a transaction", async () => {
    const transactionSpy = vi.spyOn(useCase, "create");
    const transaction = await useCase.create(payloadMock);

    expect(transactionSpy).toHaveBeenCalledOnce();
    expect(transaction).toContainEqual(payloadReturn);
  });
});
