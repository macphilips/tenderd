import CompanyRepository from "./company.repository"
import { Request, Response } from "express"

class Controller {
  private repository: CompanyRepository
  /**
   * @constructor
   *
   * @param {CompanyRepository} repository
   */
  constructor(repository: CompanyRepository) {
    this.repository = repository
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
    return Promise.resolve(undefined)
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
    return Promise.resolve(undefined)
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
    res.status(200).json({
      companies: [
        { id: "company-123", name: "Rancho" },
        { id: "company-124", name: "Tendern" },
        { id: "company-125", name: "CNN" }
      ]
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
    return Promise.resolve(undefined)
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
  getUsersWithinAuthUserCompany(req: Request, res: Response) {
    const users = [
      { id: "123", name: "Titilope Morolari", email: "tmorolari@gmail.com" },
      {
        id: "124",
        name: "Michael Jackson",
        email: "michael.jasckson@gmail.com"
      },
      { id: "126", name: "Kobe Bryant", email: "kobe.bryant@gmail.com" }
    ]
    res.status(200).json({ users })
  }
}

export default Controller
