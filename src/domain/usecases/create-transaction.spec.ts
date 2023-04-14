import { describe, expect, it, vi } from "vitest";
import { TransactionPostgresRepository } from "../../infra/repositories/prisma/transaction-repository";
import { calculatePaymentDate } from "../helper/transaction-helper";
import { CreateTransactionUseCase } from "./create-transaction-usecase";

describe("create transaction", () => {
  const repository = new TransactionPostgresRepository();
  const useCase = new CreateTransactionUseCase(repository);
  const validFrom = new Date("2020-01-01T00:00:00Z");
  const expectedReturn = [
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
    const transactionSpy = vi.spyOn(repository, "create")
      .mockResolvedValue(expectedReturn);

    const data = {
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

    const transaction = await useCase.create(data);

    expect(transactionSpy).toHaveBeenCalled();
    expect(transaction).toHaveLength(1);
    expect(transaction[0]).toHaveProperty("id");
    expect(transaction[0]).toHaveProperty("value", 100.0);
    expect(transaction[0]).toHaveProperty("cpf", "079.430.010-36");
    expect(transaction[0]).toHaveProperty("description", "Test");
    expect(transaction[0]).toHaveProperty("paymentMethod", "credit_card");
    expect(transaction[0]).toHaveProperty("cardNumber", "4066");
    expect(transaction[0]).toHaveProperty("cardHolderName", "John Doe");
    expect(transaction[0]).toHaveProperty("validFrom", validFrom);
    expect(transaction[0]).toHaveProperty("verificationNumber", "123");
    expect(transaction[0]).toHaveProperty("payablesId");
  });
});
