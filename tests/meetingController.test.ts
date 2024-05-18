import request from "supertest";
import app from "../src/app";

describe("Meeting Endpoints", () => {
  it("should create a new meeting", async () => {
    const res = await request(app).post("/api/meetings").send({
      title: "Board Meeting",
      description: "Discuss quarterly goals",
      date: new Date(),
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("title", "Board Meeting");
  });

  it("should get all meetings", async () => {
    const res = await request(app).get("/api/meetings");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
