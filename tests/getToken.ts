import request from "supertest";
import app from "../src/app";

export async function getToken() {
  const res = await request(app).post("/api/users/login").send({
    email: "john.doe@example.com",
    password: "Password123!",
  });
  if (res.statusCode !== 200) {
    throw new Error("Unable to fetch token");
  }
  console.log("Fetched token:", res.body.token); // Log the token for debugging
  console.log("JWT Secret in getToken:", process.env.JWT_SECRET);

  return res.body.token;
}
