import { Services } from "../../config"
import { Request, Response } from "express"

class RequestController {
  private services: Services
  /**
   * @constructor
   *
   * @param services {Services}
   */
  constructor(services: Services) {
    this.services = services
  }

  /**
   * @swagger
   *
   * /requests/{id}:
   *   put:
   *     description: Update existing Request by id
   *     produces:
   *       - application/json
   *     tags:
   *       - Request
   *     parameters:
   *       - name: id
   *         in: path
   *         type: string
   *         required: true
   *     responses:
   *       200:
   *         description: Returns the updated request
   *         schema:
   *            $ref: '#/definitions/Request'
   */
  async updateRequest(request: Request, res: Response) {}

  /**
   * @swagger
   *
   * /requests:
   *   post:
   *     description: Creates a new request
   *     produces:
   *       - application/json
   *     tags:
   *       - Request
   *     parameters:
   *       - in: body
   *         name: request
   *         schema:
   *           $ref: '#/definitions/Request'
   *     responses:
   *       200:
   *         description: Returns the created request
   *         schema:
   *            $ref: '#/definitions/Request'
   *       401:
   *         description: Authentication Error
   *         schema:
   *            $ref: '#/definitions/AuthenticationError'
   */
  async createRequest(request: Request, res: Response) {}

  /**
   * @swagger
   *
   * /requests:
   *   get:
   *     description: Fetch all requests for authenticated user's company
   *     produces:
   *       - application/json
   *     tags:
   *       - Request
   *     responses:
   *       200:
   *         description: Returns a list of requests assigned to users of the auth user's company
   *         schema:
   *          properties:
   *            requests:
   *              type: array
   *              items:
   *                $ref: '#/definitions/Request'
   *       401:
   *         description: Authentication Error
   *         schema:
   *            $ref: '#/definitions/AuthenticationError'
   */
  async getRequestsForAuthUserCompany(req: Request, res: Response) {
    const user = await this.services.user.getUserById((req as any).authUserId)
    const companyId = user?.companyId
    if (companyId === undefined) {
      // TODO return a 404 error here once we connect to database
      return res.status(200).json({
        requests: []
      })
    }
    const requests = await this.services.request.getRequestsUserCompany(
      companyId
    )
    return res.status(200).json({
      requests
    })
  }

  /**
   * @swagger
   *
   * /requests/{id}:
   *   get:
   *     description: Fetch all requests for authenticated user's company
   *     produces:
   *       - application/json
   *     tags:
   *       - Request
   *     parameters:
   *       - name: id
   *         in: path
   *         type: string
   *         required: true
   *     responses:
   *       200:
   *         description: Returns the created request
   *         schema:
   *            $ref: '#/definitions/Request'
   */
  async getRequestById(req: Request, res: Response) {
    return Promise.resolve(undefined)
  }

  /**
   * @swagger
   *
   * /requests/user/{userId}:
   *   get:
   *     description: Fetch all requests for assigned to a particular company
   *     produces:
   *       - application/json
   *     tags:
   *       - Request
   *     parameters:
   *       - name: userId
   *         in: path
   *         type: string
   *         required: true
   *     responses:
   *       200:
   *         description: List of Requests
   *         schema:
   *          properties:
   *            requests:
   *              type: array
   *              items:
   *                $ref: '#/definitions/Request'
   *       401:
   *         description: Authentication Error
   *         schema:
   *            $ref: '#/definitions/AuthenticationError'
   */
  async getRequestsForUser(req: Request, res: Response) {
    const user = await this.services.user.getUserById((req as any).authUserId)
    const companyId = user?.companyId
    if (companyId === undefined) return
    const requests = await this.services.request.getRequestsUserCompany(
      companyId
    )
  }

  /**
   * @swagger
   *
   * /requests/company/{companyId}:
   *   get:
   *     description: Fetch all requests assigned to a particular company
   *     produces:
   *       - application/json
   *     tags:
   *       - Request
   *     parameters:
   *       - name: companyId
   *         in: path
   *         type: string
   *         required: true
   *     responses:
   *       200:
   *         description: List of Requests
   *         schema:
   *          properties:
   *            requests:
   *              type: array
   *              items:
   *                $ref: '#/definitions/Request'
   *       401:
   *         description: Authentication Error
   *         schema:
   *            $ref: '#/definitions/AuthenticationError'
   */
  async getRequestsForCompany(req: Request, res: Response) {
    const user = await this.services.user.getUserById((req as any).authUserId)
    const companyId = user?.companyId
    if (companyId === undefined) return
    const requests = await this.services.request.getRequestsUserCompany(
      companyId
    )
  }
}

export default RequestController
