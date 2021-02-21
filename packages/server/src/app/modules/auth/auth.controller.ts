import AuthService from "./auth.service"
import { Request, Response } from "express"
import { Services } from "../../config"
import HttpError from "../errors/HttpError"

class Controller {
  private service: Services
  /**
   * @constructor
   *
   * @param {AuthService} services
   */
  constructor(services: Services) {
    this.service = services
  }

  /**
   * @swagger
   *
   * /auth/signup:
   *   post:
   *     description: Endpoint for creating a new user on the platform
   *     produces:
   *       - application/json
   *     tags:
   *       - Auth
   *     parameters:
   *       - in: body
   *         name: request
   *         schema:
   *           $ref: '#/definitions/User'
   *     responses:
   *       200:
   *         description: Created user
   *         schema:
   *             $ref: '#/definitions/User'
   */
  async createUser(req: Request, res: Response) {
    const { email, password, name } = req.body
    const { password: _, ...user } = await this.service.auth.createUser({
      email,
      password,
      name
    })
    res.status(201).json({ ...user })
  }

  /**
   * @swagger
   *
   * /auth/me:
   *   get:
   *     description: Endpoint for get authenticated user
   *     produces:
   *       - application/json
   *     tags:
   *       - Auth
   *     responses:
   *       200:
   *         description: Authenticated User Information
   *         schema:
   *            $ref: '#/definitions/User'
   */
  async getMe(req: Request, res: Response) {
    const { authUserId } = req as any
    const user = await this.service.user.getUserById(authUserId)
    if (!user) {
      throw new HttpError("USR_03", 404)
    }
    res.status(200).json(user)
  }
}

export default Controller
