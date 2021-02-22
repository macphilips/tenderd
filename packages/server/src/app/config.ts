import * as admin from "firebase-admin"
import AuthService from "./modules/auth/auth.service"
import UserRepository from "./modules/user/user.repository"
import RequestRepository from "./modules/request/request.repository"
import CompanyRepository from "./modules/company/company.repository"
import { Repository } from "./datasource"

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
  datasource: Repository<any>
}

export const createServices: () => Services = () => {
  const firestore = admin.firestore()
  const datasource = new Repository(firestore)
  const user = new UserRepository(firestore)
  const auth = new AuthService(admin.auth(), user)
  const request = new RequestRepository(firestore)
  const company = new CompanyRepository(firestore)
  return { auth, user, request, company, datasource }
}
