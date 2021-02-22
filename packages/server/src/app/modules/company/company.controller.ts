import CompanyRepository from "./company.repository"
import { Request, Response } from "express"
import { Services } from "../../config"
import UserRepository from "../user/user.repository"
import HttpError from "../errors/HttpError"

class Controller {
  private repository: CompanyRepository
  private userRepository: UserRepository
  /**
   * @constructor
   *
   * @param {CompanyRepository} services
   */
  constructor(services: Services) {
    this.repository = services.company
    this.userRepository = services.user
  }

  /**
   * @swagger
   *
   * /companies/{companyId}:
   *   post:
   *     description: Endpoint for fetching all companies within the app
   *     produces:
   *       - application/json
   *     tags:
   *       - Company
   *     responses:
   *       200:
   *         description: Success Response
   *         schema:
   *           $ref: '#/definitions/ApiResponse'
   */
  async addAuthUserToCompany(req: Request, res: Response) {
    const { companyId } = req.params
    const company = this.repository.findById(companyId)
    if (!company) throw new HttpError("COMP_01", 400)

    const { authUserId } = req as any
    await this.userRepository.updateUser({ id: authUserId, companyId })

    return res.status(200).json({
      success: true,
      message: "Successfully removed company from company"
    })
  }

  /**
   * @swagger
   *
   * /companies/users/{userId}:
   *   delete:
   *     description: Endpoint for fetching all companies within the app
   *     produces:
   *       - application/json
   *     tags:
   *       - Company
   *     parameters:
   *       - name: companyId
   *         in: path
   *         type: string
   *         required: true
   *     responses:
   *       200:
   *         description: Success Response
   *         schema:
   *           $ref: '#/definitions/ApiResponse'
   */
  async removeUserFromCompany(req: Request, res: Response) {
    // ensure authenticated user cannot remove themselves
    const { userId } = req.params
    const { authUserId } = req as any
    if (authUserId === userId) throw new HttpError("AUTH_03", 403)

    // const user = this.userRepository.getUserById(userId)
    // if (!user) throw new HttpError("USR_02", 400)

    await this.userRepository.updateUser({ id: userId, companyId: undefined })
    return res.status(200).json({
      success: true,
      message: "Successfully removed user from company"
    })
  }

  /**
   * @swagger
   *
   * /companies:
   *   get:
   *     description: Endpoint for fetching all companies on the platform
   *     produces:
   *       - application/json
   *     tags:
   *       - Company
   *     responses:
   *       200:
   *         description: List of companies
   *         schema:
   *          properties:
   *            companies:
   *              type: array
   *              items:
   *                $ref: '#/definitions/Company'
   */
  async getAllCompanies(req: Request, res: Response) {
    const companies = await this.repository.findAllCompanies()
    res.status(200).json({
      companies
    })
  }

  /**
   * @swagger
   *
   * /companies/{companyId}/users:
   *   get:
   *     description: Endpoint for fetching users under the provided company id
   *     produces:
   *       - application/json
   *     tags:
   *       - Company
   *     parameters:
   *       - name: companyId
   *         in: path
   *         type: string
   *         required: true
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
  async getUsersByCompany(req: Request, res: Response) {
    const { companyId } = req.params
    const {
      results: users
    } = await this.userRepository.findAllUsersByCompanyId(companyId)
    res.status(200).json({ users })
  }

  /**
   * @swagger
   *
   * /companies/users:
   *   get:
   *     description: Endpoint for fetching users under the same company as the authenticate user
   *     produces:
   *       - application/json
   *     tags:
   *       - Company
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
  async getUsersWithinAuthUserCompany(req: Request, res: Response) {
    const { companyId } = req as any
    const {
      results: users
    } = await this.userRepository.findAllUsersByCompanyId(companyId)
    res.status(200).json({ users })
  }
}

export default Controller
