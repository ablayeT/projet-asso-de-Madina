import request from "supertest";
import app from "../src/app";
import { getToken } from "./getToken";

describe("Meeting Endpoints", () => {
  let token: string;

  beforeAll(async () => {
    token = await getToken();
    console.log("Token in tests:", token); // Log the token
  });

  it("should create a new meeting", async () => {
    const res = await request(app)
      .post("/api/meetings")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Board Meeting",
        description: "Discuss quarterly goals",
        date: new Date(),
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("title", "Board Meeting");
  }, 30000); // 30 seconds timeout

  it("should get all meetings", async () => {
    const res = await request(app)
      .get("/api/meetings")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  }, 30000); // 30 seconds timeout
});
