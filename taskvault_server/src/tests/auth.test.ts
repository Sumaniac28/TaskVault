import request from "supertest";
import { app, startServer } from "../index";

const email = `test${Date.now()}@example.com`;

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  await startServer();
});

describe("Auth API", () => {
  it("should signup user", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      email,
      password: "123456",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  it("should login user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email,
      password: "123456",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
