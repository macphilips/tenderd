import { Services } from "../../config"
import { Request, Response } from "express"
import { Request as RequestObject } from "../../datasource/types"

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
  async updateRequest(req: Request, res: Response) {
    const request = RequestController.getRequestObjectFromBody(req)
    const { authUserId, authUserName } = req as any
    const result = await this.services.request.updateRequest(request, {
      authUserId,
      authUserName
    })

    res.status(200).json(result)
  }

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
   *       201:
   *         description: Returns the created request
   *         schema:
   *            $ref: '#/definitions/Request'
   *       401:
   *         description: Authentication Error
   *         schema:
   *            $ref: '#/definitions/AuthenticationError'
   */
  async createRequest(req: Request, res: Response) {
    const request = RequestController.getRequestObjectFromBody(req)
    const { authUserId, authUserName } = req as any
    const result = await this.services.request.createRequest(request, {
      authUserId,
      authUserName
    })
    res.status(201).json(result)
  }

  private static getRequestObjectFromBody(req: Request) {
    const {
      id,
      description,
      type,
      status,
      assignedUserId,
      assignedUserName,
      companyId,
      companyName,
      resources
    } = req.body
    const request = {
      id,
      description,
      type,
      status,
      assignedUserId,
      assignedUserName,
      companyId,
      companyName,
      resources
    }
    return request as RequestObject
  }

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
    const requests = await this.services.request.findAllRequestsForCompany(
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
    const { id } = req.params
    const result = await this.services.request.getRequestById(id)
    res.status(200).json(result)
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
    const { userId } = req.params
    const user = await this.services.user.getUserById((req as any).authUserId)
    const companyId = user?.companyId
    if (companyId === undefined) return
    const requests = await this.services.request.findAllRequestsForUser(userId)
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
    const requests = await this.services.request.findAllRequestsForCompany(
      companyId
    )
  }
}

export default RequestController
