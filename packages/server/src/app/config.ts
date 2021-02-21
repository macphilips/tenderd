import * as admin from "firebase-admin"
import AuthService from "./modules/auth/auth.service"
import UserRepository from "./modules/user/user.service"
import RequestRepository from "./modules/request/request.repository"
import CompanyRepository from "./modules/company/company.repository"

// const serviceAccount = require("./serviceAccountKey.json")
// const options = {
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://tenderd-28498-default-rtdb.firebaseio.com"
// }
// admin.initializeApp(options)

admin.initializeApp() // options not required when deploying to cloud function

export type Services = {
  auth: AuthService
  user: UserRepository
  request: RequestRepository
  company: CompanyRepository
}

export const createServices: () => Services = () => {
  const auth = new AuthService(admin.auth())
  const user = new UserRepository()
  const request = new RequestRepository()
  const company = new CompanyRepository()
  return { auth, user, request, company }
}
