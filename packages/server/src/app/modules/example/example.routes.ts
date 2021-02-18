import ExampleController from "./example.controller"
import Controller from "./example.controller"
import ExampleRepository from "./example.repository"
import { Application, Request, Response } from "express"
import { CommonRoutesConfig } from "../common-routes-config"

/**
 * @swagger
 * parameters:
 *   id:
 *    in: path
 *    name: id
 *    required: true
 *    type: integer
 *    description: Example ID
 *    example: 1
 */

/**
 * @swagger
 * definitions:
 *   ExampleModel:
 *     type: object
 *     properties:
 *       id:
 *         type: number
 *         example: 1
 *       message:
 *         type: string
 *         example: This is a message
 *       status:
 *         type: string
 *         enum:
 *         - Sent
 *         - Failed
 *         example: Sent
 *   Examples:
 *     type: array
 *     items:
 *       $ref: '#/definitions/ExampleModel'
 *
 */

/**
 * @swagger
 *
 * /example:
 *   get:
 *     description: Send example to another contact
 *     produces:
 *       - application/json
 *     tags:
 *       - Example
 *     parameters:
 *       - in: body
 *         name: send_message
 *         schema:
 *          properties:
 *            message:
 *              type: string
 *              example: The is a message
 *     responses:
 *       200:
 *         description: Returns the created contact
 *         schema:
 *          properties:
 *            status:
 *              type: string
 *              enum:
 *              - Sent
 *              - Failed
 *              example: Sent
 */

export class ExampleRoutes extends CommonRoutesConfig {
  private readonly service: ExampleRepository
  private readonly controller: Controller
  constructor(app: Application, baseUrl = "") {
    super(app, "Example", baseUrl)
    this.service = new ExampleRepository()
    this.controller = new ExampleController(this.service)
  }

  configureRoutes() {
    this.app
      .route(`${this.baseUrl}/example`)
      .get((req: Request, res: Response) => {
        res.status(200).json(`List of examples`)
      })
      .post((req: Request, res: Response) => {
        res.status(200).json(`Post to example`)
      })
    return this.app
  }
}

export default (app: Application, baseUrl: string): CommonRoutesConfig[] => [
  new ExampleRoutes(app, baseUrl)
]
