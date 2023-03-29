import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../../server";

describe("Validate get transaction middleware", async () => {
  it("should have a valid payload", async () => {
    const response = await request(app)
      .get("/transaction")
      .send({
        cpf: "079.430.010-36",
      });
    expect(response.status).toBe(200);
  });

});
