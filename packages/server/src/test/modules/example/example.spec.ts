import { app } from "../../../app"
import request from "supertest"

describe("Example Endpoint", () => {
  test("should hit get endpoint", async (done) => {
    const res = await request(app).get("/api/v1/example").set({
      Accept: "application/json"
    })

    expect(res.status).toEqual(200)
    expect(res.body).toEqual("List of examples")
    done()
  })
  test("should hit post endpoint", async (done) => {
    const res = await request(app).post("/api/v1/example").set({
      Accept: "application/json"
    })

    expect(res.status).toEqual(200)
    expect(res.body).toEqual("Post to example")
    done()
  })
})
