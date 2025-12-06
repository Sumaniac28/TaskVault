import request from "supertest";
import { app, startServer } from "../index";

let token = "";
const email = `task${Date.now()}@example.com`;

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  await startServer();

  await request(app).post("/api/auth/signup").send({
    email,
    password: "123456",
  });

  const res = await request(app).post("/api/auth/login").send({
    email,
    password: "123456",
  });

  token = res.body.token;
});

describe("Task API", () => {
  it("should create task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Task",
        priority: "high",
      });

    expect(res.statusCode).toBe(201);
  });

  it("should fetch tasks", async () => {
    const res = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});
