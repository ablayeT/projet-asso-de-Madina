import request from "supertest";
import app from "../src/app";

describe("User Endpoints", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/users/register").send({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "Password123!",
      phone: "1234567890",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.text).toBe("User registered successfully");
  });

  it("should login a user", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "john.doe@example.com",
      password: "Password123!",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
});
