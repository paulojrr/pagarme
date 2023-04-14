import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import { prisma } from "../../repositories/prisma/prisma-client";
import { app } from "../server";

const validFrom = new Date("2020-01-01T00:00:00.000Z");

const payload = {
  value: 100.0,
  cpf: "079.430.010-36",
  description: "Test",
  paymentMethod: "credit_card",
  cardNumber: "4006604842674066",
  cardHolderName: "John Doe",
  validFrom,
  verificationNumber: "123",
};

describe("TransactionController", async () => {
  it("should create a transaction", async () => {
    const response = await request(app).post("/transaction").send(payload);

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("value");
    expect(response.body[0]).toHaveProperty("cpf");
    expect(response.body[0]).toHaveProperty("description");
    expect(response.body[0]).toHaveProperty("paymentMethod");
    expect(response.body[0]).toHaveProperty("cardNumber");
    expect(response.body[0]).toHaveProperty("cardHolderName");
    expect(response.body[0]).toHaveProperty("validFrom");
    expect(response.body[0]).toHaveProperty("verificationNumber");
  });

  it("should return 400 status code if receive invalid payload", async () => {
    const response = await request(app).post("/transaction").send({});
    expect(response.status).toBe(400);
  });

  it("should return an error if fail to insert data into the database", async () => {
    const transactionSpy = vi.spyOn(prisma.transaction, "create");
    transactionSpy.mockRejectedValue(new Error("Error"));

    const response = await request(app).post("/transaction").send(payload);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Error");
  });

  it("should return available value", async () => {
    const response = await request(app).get("/transaction/available?cpf=07943001036")

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("available");
  });

  it("should return waiting funds values", async () => {
    const response = await request(app).get("/transaction/waitingFunds?cpf=07943001036")

    console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("waitingFunds");
  });

  it("should return 400 status code if return an error in available transactions", async () => {
    const transactionSpy = vi.spyOn(prisma.transaction, "findMany");
    transactionSpy.mockRejectedValue(new Error("Error"));

    const response = await request(app).get("/transaction/available?cpf=07943001036")

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Error");

  });

  it("should return 400 status code if return an error in waitingFunds transactions", async () => {
    const transactionSpy = vi.spyOn(prisma.transaction, "findMany");
    transactionSpy.mockRejectedValue(new Error("Error"));

    const response = await request(app).get("/transaction/waitingFunds?cpf=07943001036")

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Error");
  });
});
