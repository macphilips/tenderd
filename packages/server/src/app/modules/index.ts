import { Application } from "express"
import registerApiDoc from "./api-docs"
import registerExample from "./example/example.routes"
import registerCompany from "./company/company.routes"
import registerRequest from "./request/request.routes"
import registerAuthRoutes from "./auth/auth.routes"
import registerUser from "./user/user.routes"
import { registerErrorHandler } from "./errors"
import { Services } from "../config"
import { secureRoutes } from "../middlewares/verifyToken"

const basePath = "/api/v1"

const routes = (app: Application, services: Services) => {
  app.use(secureRoutes(services.auth, basePath))

  registerApiDoc(app, basePath)
  registerExample(app, basePath)
  registerCompany(app, basePath, services)
  registerRequest(app, basePath, services)
  registerUser(app, basePath, services)
  registerAuthRoutes(app, basePath, services)

  // must be the last thing to register
  registerErrorHandler(app)
  return app
}

export default routes
