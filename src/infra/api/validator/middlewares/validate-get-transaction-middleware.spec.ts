import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../../server";

describe("Validate get transaction middleware", async () => {
  it("should return a 200 status code if the cpf query parameter is present", async () => {
    const response = await request(app)
      .get("/transaction/available?cpf=07943001036");
    expect(response.status).toBe(200);
  });

  it("should return a 200 status code if the cpf query parameter is present", async () => {
    const response = await request(app)
      .get("/transaction/waitingFunds?cpf=07943001036");
    expect(response.status).toBe(200);
  });

  it("should return a 400 status code if the cpf query parameter is missing", async () => {
    const response = await request(app)
      .get("/transaction/available");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toContain('"cpf" is required');
  });

  it("should return a 400 status code if the cpf query parameter is missing", async () => {
    const response = await request(app)
      .get("/transaction/waitingFunds");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toContain('"cpf" is required');
  });
});
