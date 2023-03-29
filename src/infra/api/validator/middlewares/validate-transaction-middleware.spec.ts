import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../../server";

describe("Validate transaction middleware", async () => {
  it("should have a valid payload", async () => {
    const response = await request(app)
      .post("/transaction")
      .send({
        value: 100.0,
        cpf: "079.430.010-36",
        description: "Test",
        paymentMethod: "credit_card",
        cardNumber: "4006604842674066",
        cardHolderName: "John Doe",
        validFrom: new Date("2020-01-01T00:00:00.000Z"),
        verificationNumber: "123",
      });
    expect(response.status).toBe(200);
  });

  it("should return an error if missing value", async () => {
    const response = await request(app)
      .post("/transaction")
      .send({
        cpf: "079.430.010-36",
        description: "Test",
        paymentMethod: "credit_card",
        cardNumber: "4006604842674066",
        cardHolderName: "John Doe",
        validFrom: new Date("2020-01-01T00:00:00.000Z"),
        verificationNumber: "123",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"value" is required');
  });

  it("should return an error if missing cpf", async () => {
    const response = await request(app)
      .post("/transaction")
      .send({
        value: 100.0,
        description: "Test",
        paymentMethod: "credit_card",
        cardNumber: "4006604842674066",
        cardHolderName: "John Doe",
        validFrom: new Date("2020-01-01T00:00:00.000Z"),
        verificationNumber: "123",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"cpf" is required');
  })

  it("should return an error if missing description", async () => {
    const response = await request(app)
      .post("/transaction")
      .send({
        value: 100.0,
        cpf: "079.430.010-36",
        paymentMethod: "credit_card",
        cardNumber: "4006604842674066",
        cardHolderName: "John Doe",
        validFrom: new Date("2020-01-01T00:00:00.000Z"),
        verificationNumber: "123",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"description" is required');
  });

  it("should return an error if missing paymentMethod", async () => {
    const response = await request(app)
      .post("/transaction")
      .send({
        value: 100.0,
        cpf: "079.430.010-36",
        description: "Test",
        cardNumber: "4006604842674066",
        cardHolderName: "John Doe",
        validFrom: new Date("2020-01-01T00:00:00.000Z"),
        verificationNumber: "123",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"paymentMethod" is required');
  });

  it("should return an error if missing cardNumber", async () => {
    const response = await request(app)
      .post("/transaction")
      .send({
        value: 100.0,
        cpf: "079.430.010-36",
        description: "Test",
        paymentMethod: "credit_card",
        cardHolderName: "John Doe",
        validFrom: new Date("2020-01-01T00:00:00.000Z"),
        verificationNumber: "123",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"cardNumber" is required');
  });

  it("should return an error if missing cardHolderName", async () => {
    const response = await request(app)
      .post("/transaction")
      .send({
        value: 100.0,
        cpf: "079.430.010-36",
        description: "Test",
        paymentMethod: "credit_card",
        cardNumber: "4006604842674066",
        validFrom: new Date("2020-01-01T00:00:00.000Z"),
        verificationNumber: "123",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"cardHolderName" is required');
  });

  it("should return an error if missing validFrom", async () => {
    const response = await request(app).post("/transaction").send({
      value: 100.0,
      cpf: "079.430.010-36",
      description: "Test",
      paymentMethod: "credit_card",
      cardNumber: "4006604842674066",
      cardHolderName: "John Doe",
      verificationNumber: "123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"validFrom" is required');
  });

  it("should return an error if missing verificationNumber", async () => {
    const response = await request(app)
      .post("/transaction")
      .send({
        value: 100.0,
        cpf: "079.430.010-36",
        description: "Test",
        paymentMethod: "credit_card",
        cardNumber: "4006604842674066",
        cardHolderName: "John Doe",
        validFrom: new Date("2020-01-01T00:00:00.000Z"),
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"verificationNumber" is required');
  });
});
