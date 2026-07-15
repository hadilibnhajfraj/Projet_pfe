const request = require("supertest");
const app = require("../src/app");

describe("API", () => {
  test("GET / retourne 200", async () => {
    const res = await request(app).get("/");

    expect(res.statusCode).toBe(200);
  });
});
