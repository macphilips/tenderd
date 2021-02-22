import { auth } from "firebase-admin"
import { User } from "../../datasource/types"
import HttpError from "../errors/HttpError"
import { UserModel } from "../../datasource/models"
import UserRepository from "../user/user.repository"

class AuthService {
  constructor(
    private firebaseAuthService: auth.Auth,
    private datasource: UserRepository
  ) {}

  async verifyToken(token: string) {
    try {
      const { uid } = await this.firebaseAuthService.verifyIdToken(token)
      return uid
    } catch (e) {
      throw new HttpError("AUTH_01", 401)
    }
  }

  async createUser(user: {
    email: string
    name: string
    password: string
  }): Promise<Partial<User>> {
    try {
      const { email, name, password } = user

      const { uid } = await this.firebaseAuthService.createUser({
        email,
        password,
        displayName: name
      })

      await this.datasource.create(UserModel.create({ id: uid, email, name }))

      return { id: uid, email, name }
    } catch (e) {
      console.log(e)
      throw new HttpError("", 500, undefined, e.message)
    }
  }
}

export default AuthService
