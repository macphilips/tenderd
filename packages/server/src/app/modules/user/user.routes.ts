import UserController from "./user.controller"
import Controller from "./user.controller"
import { Application, Request, Response } from "express"
import { CommonRoutesConfig } from "../common-routes-config"
import { Services } from "../../config"
import { errorCatcher } from "../errors"

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       id:
 *         type: number
 *         example: 1
 *       name:
 *         type: string
 *         example: Michael Jackson
 *       email:
 *         type: string
 *         example: michael.jackson@gmail.com
 *       companyId:
 *         type: string
 *         example: 23
 *
 */

export class UserRoutes extends CommonRoutesConfig {
  private readonly controller: Controller
  constructor(app: Application, baseUrl = "", controller: UserController) {
    super(app, "User", baseUrl)
    this.controller = controller
  }

  configureRoutes() {
    this.app
      .route(`${this.baseUrl}/users`)
      .get(
        errorCatcher(async (req: Request, res: Response) =>
          this.controller.getAllUsers(req, res)
        )
      )
    this.app
      .route(`${this.baseUrl}/users/:id`)
      .put(
        errorCatcher(async (req: Request, res: Response) =>
          this.controller.updateUser(req, res)
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
  new UserRoutes(app, baseUrl, new UserController(services.user))
]
