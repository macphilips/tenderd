import request from "supertest"
import { app } from "../../../app/app"

describe("Company Endpoint", () => {
  test("should add user to a company given a valid company id", async (done) => {
    const companyId = "123"
    const res = await request(app).post(`/api/v1/companies/${companyId}`).set({
      Accept: "application/json"
    })

    expect(res.status).toEqual(200)
    expect(res.body).toEqual("List of examples")
    done()
  })
  test("should return all companies on the platform", async (done) => {
    const res = await request(app).get("/api/v1/companies").set({
      Accept: "application/json"
    })

    expect(res.status).toEqual(200)
    expect(res.body).toEqual("Post to example")
    done()
  })
  test("should return a list of users under the same company as authenticated user", async (done) => {
    const res = await request(app).get("/api/v1/companies/users").set({
      Accept: "application/json"
    })

    expect(res.status).toEqual(200)
    expect(res.body).toEqual("Post to example")
    done()
  })
  test("should return a list of users under the provided company id", async (done) => {
    const companyId = "123"
    const res = await request(app)
      .get(`/api/v1/companies/${companyId}/users`)
      .set({
        Accept: "application/json"
      })

    expect(res.status).toEqual(200)
    expect(res.body).toEqual("Post to example")
    done()
  })
})
