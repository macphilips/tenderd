import CompanyController from "./company.controller"
import { Application, Request, Response } from "express"
import { CommonRoutesConfig } from "../common-routes-config"
import { Services } from "../../config"
import { errorCatcher } from "../errors"

/**
 * @swagger
 * definitions:
 *   Company:
 *     type: object
 *     properties:
 *       id:
 *         type: number
 *         example: 1
 *       name:
 *         type: string
 *         example: Tenderd
 *
 */

/**
 * @swagger
 * definitions:
 *   ApiResponse:
 *     type: object
 *     properties:
 *        success:
 *          type: boolean
 *          example: true
 *        message:
 *          type: string
 *          example: Successfully add user to company *
 */
export class CompanyRoutes extends CommonRoutesConfig {
  private readonly controller: CompanyController
  constructor(
    app: Application,
    baseUrl: string,
    controller: CompanyController
  ) {
    super(app, "Company ", baseUrl)
    this.controller = controller
  }

  configureRoutes() {
    this.app
      .route(`${this.baseUrl}/companies/:companyId`)
      .post(
        errorCatcher(async (req: Request, res: Response) =>
          this.controller.addAuthUserToCompany(req, res)
        )
      )
    this.app
      .route(`${this.baseUrl}/companies`)
      .get(
        errorCatcher(async (req: Request, res: Response) =>
          this.controller.getAllCompanies(req, res)
        )
      )

    this.app
      .route(`${this.baseUrl}/companies/users`)
      .get(
        errorCatcher(async (req: Request, res: Response) =>
          this.controller.getUsersWithinAuthUserCompany(req, res)
        )
      )

    this.app
      .route(`${this.baseUrl}/companies/:companyId/users`)
      .get(
        errorCatcher(async (req: Request, res: Response) =>
          this.controller.getUsersByCompany(req, res)
        )
      )

    this.app
      .route(`${this.baseUrl}/companies/users/:userId`)
      .delete(
        errorCatcher(async (req: Request, res: Response) =>
          this.controller.removeUserFromCompany(req, res)
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
  new CompanyRoutes(app, baseUrl, new CompanyController(services))
]
