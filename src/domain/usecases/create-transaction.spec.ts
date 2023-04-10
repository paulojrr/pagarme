import { beforeEach, describe, expect, it, vi } from "vitest";
import { TransactionPostgresRepository } from "../../infra/repositories/prisma/transaction-repository";
import { calculatePaymentDate } from "../helper/transaction-helper";
import { TransactionRepository } from "../interfaces/repositories/transaction-repository";
import { CreateTransactionUseCase } from "./create-transaction-usecase";

describe("create transaction", () => {
  let repository: TransactionRepository;
  let useCase: CreateTransactionUseCase;

  beforeEach(async () => {
    repository = new TransactionPostgresRepository();
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

  const payloadReturn = [
    {
      id: expect.any(String),
      value: 100.0,
      cpf: "079.430.010-36",
      description: "Test",
      paymentMethod: "credit_card",
      cardNumber: "4066",
      cardHolderName: "John Doe",
      validFrom,
      verificationNumber: "123",
      payablesId: expect.any(String),
    }
  ];

  it("should create and return a transaction", async () => {
    const transactionSpy = vi.spyOn(repository, "create");
    transactionSpy.mockResolvedValue(payloadReturn);

    const transaction = await useCase.create(payloadMock);

    expect(transactionSpy).toHaveBeenCalledOnce();
    expect(transaction).toEqual(payloadReturn);
  });
});
