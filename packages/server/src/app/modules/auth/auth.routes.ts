import AuthController from "./auth.controller"
import { Application, Request, Response } from "express"
import { CommonRoutesConfig } from "../common-routes-config"
import { Services } from "../../config"
import { errorCatcher } from "../errors"

/**
 * @swagger
 * definitions:
 *   AuthenticationError:
 *     type: object
 *     properties:
 *       code:
 *         type: number
 *         example: AUTH_O1
 *       message:
 *         type: string
 *         example: This is a message
 *
 */
export class AuthRoutes extends CommonRoutesConfig {
  private readonly controller: AuthController
  constructor(app: Application, baseUrl: string, controller: AuthController) {
    super(app, "Company ", baseUrl)
    this.controller = controller
  }

  configureRoutes() {
    this.app
      .route(`${this.baseUrl}/auth/signup`)
      .post(
        errorCatcher(async (req: Request, res: Response) =>
          this.controller.createUser(req, res)
        )
      )
    this.app
      .route(`${this.baseUrl}/auth/me`)
      .get(
        errorCatcher(async (req: Request, res: Response) =>
          this.controller.getMe(req, res)
        )
      )
    return this.app
  }
}

export default (
  app: Application,
  baseUrl: string,
  services: Services
): CommonRoutesConfig[] => [
  new AuthRoutes(app, baseUrl, new AuthController(services))
]
