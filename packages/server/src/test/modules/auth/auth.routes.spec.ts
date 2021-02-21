import request from "supertest"
import { app } from "../../../app/app"

describe("Auth Endpoint", () => {
  test("should create user account", async (done) => {
    const res = await request(app)
      .post("/api/v1/auth/signup")
      .send({
        name: "John Doe",
        password: "password",
        email: "john.doe@gmail.com"
      })
      .set({
        Accept: "application/json"
      })
    expect(res.status).toEqual(200)
    expect(res.body).toEqual("List of examples")
    done()
  })
})
