import { auth } from "firebase-admin"
import { User } from "../../datasource/types"
import HttpError from "../errors/HttpError"

class AuthService {
  constructor(private firebaseAuthService: auth.Auth) {}

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
  }): Promise<User> {
    try {
      const { email, name, password } = user

      const { uid } = await this.firebaseAuthService.createUser({
        email,
        password,
        displayName: name
      })

      return {
        id: uid,
        email,
        name,
        password: (null as unknown) as string
      }
    } catch (e) {
      console.log(e)
      throw new HttpError("", 500)
    }
  }
}

export default AuthService
