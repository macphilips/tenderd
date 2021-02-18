import registerApiDoc from "./api-docs"
import registerExample from "./example/example.routes"
import { registerErrorHandler } from "./errors"
import { Application } from "express"

const basePath = "/api/v1"

const routes = (app: Application) => {
  registerApiDoc(app, basePath)
  registerExample(app, basePath)
  // must be the last thing to register
  registerErrorHandler(app)
  return app
}

export default routes
