import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import { prisma } from "../../repositories/prisma/prisma-client";
import { app } from "../server";

const validFrom = new Date("2020-01-01T00:00:00.000Z");

const payload = {
  value: 100.0,
  description: "Test",
  paymentMethod: "credit_card",
  cardNumber: "4006604842674066",
  cardHolderName: "John Doe",
  validFrom,
  verificationNumber: "123",
};

describe("Create transaction controller", async () => {
  it("should create a transaction", async () => {
    const response = await request(app).post("/transaction").send(payload);

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("value");
    expect(response.body[0]).toHaveProperty("description");
    expect(response.body[0]).toHaveProperty("paymentMethod");
    expect(response.body[0]).toHaveProperty("cardNumber");
    expect(response.body[0]).toHaveProperty("cardHolderName");
    expect(response.body[0]).toHaveProperty("validFrom");
    expect(response.body[0]).toHaveProperty("verificationNumber");
  });

  it("should return an error if receive invalid payload", async () => {
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
});
