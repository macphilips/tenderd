import UserRepository from "./user.repository"
import { Request, Response } from "express"

class UserController {
  private repository: UserRepository
  /**
   * @constructor
   *
   * @param {UserRepository} repository
   */
  constructor(repository: UserRepository) {
    this.repository = repository
  }

  /**
   * @swagger
   *
   * /users:
   *   get:
   *     description: Endpoint for fetching all users on the platform
   *     produces:
   *       - application/json
   *     tags:
   *       - User
   *     responses:
   *       200:
   *         description: List of users
   *         schema:
   *          properties:
   *            users:
   *              type: array
   *              items:
   *                $ref: '#/definitions/User'
   */
  async getAllUsers(req: Request, res: Response) {}

  /**
   * @swagger
   *
   * /users/{id}:
   *   put:
   *     description: Update exiting user by id
   *     produces:
   *       - application/json
   *     tags:
   *       - User
   *     parameters:
   *       - name: id
   *         in: path
   *         type: string
   *         required: true
   *       - name: user
   *         in: body
   *         schema:
   *          type: object
   *          properties:
   *           name:
   *             type: string
   *             required: false
   *             example: Phil Jackson
   *           companyId:
   *             type: string
   *             required: false
   *             example: company-123
   *     responses:
   *       200:
   *         description: Returns the updated user
   *         schema:
   *            $ref: '#/definitions/User'
   */
  async updateUser(req: Request, res: Response) {
    const { name, companyId } = req.body
  }
}

export default UserController
