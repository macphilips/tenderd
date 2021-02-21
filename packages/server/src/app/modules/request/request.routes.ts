import RequestController from "./request.controller"
import { Application, Request, Response } from "express"
import { CommonRoutesConfig } from "../common-routes-config"
import { Services } from "../../config"
import { errorCatcher } from "../errors"

/**
 * @swagger
 * definitions:
 *   Request:
 *     type: object
 *     properties:
 *       id:
 *         type: number
 *         example: 1
 *       description:
 *         type: string
 *         example: This is a message
 *       resources:
 *         type: array
 *         example: ['https://image-url', 'https://document-url']
 *       type:
 *         type: string
 *         enum:
 *         - Breakdown
 *         - Maintenance
 *         - Replacement
 *         - Demobilisation
 *         example: Replacement
 *       status:
 *         type: string
 *         enum:
 *         - Created
 *         - InProgress
 *         - Completed
 *         - Cancelled
 *         example: InProgress
 */

export class RequestRoutes extends CommonRoutesConfig {
  private readonly controller: RequestController
  constructor(
    app: Application,
    baseUrl: string,
    controller: RequestController
  ) {
    super(app, "Request", baseUrl)
    this.controller = controller
  }

  configureRoutes() {
    this.app
      .route(`${this.baseUrl}/requests`)
      .get(
        errorCatcher(async (req: Request, res: Response) =>
          this.controller.getRequestsForAuthUserCompany(req, res)
        )
      )
      .post(
        errorCatcher(async (req: Request, res: Response) =>
          this.controller.createRequest(req, res)
        )
      )

    this.app
      .route(`${this.baseUrl}/requests/:id`)
      .put(
        errorCatcher(async (req: Request, res: Response) =>
          this.controller.updateRequest(req, res)
        )
      )
      .get(
        errorCatcher(async (req: Request, res: Response) =>
          this.controller.getRequestById(req, res)
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
  new RequestRoutes(app, baseUrl, new RequestController(services))
]
