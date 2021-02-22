import axios from "axios"
import { SignUpData } from "../components/forms/SignUpForm"
import firebase from "firebase"
import { Company, Request, User } from "./types"
import moment from "moment"

export type ApiResponse = {
  success: boolean
  message: string
}

export interface APIService {
  creatUser(email: string, password: string, name: string): Promise<User>

  updateUser(user: Partial<User>): Promise<User>

  getUsers(): Promise<{ users: User[] }>

  getRequestsForAuthUserCompany(): Promise<{ requests: Request[] }>

  updateRequest(request: Request): Promise<Request>

  createRequest(request: Request): Promise<Request>

  getRequestById(id: string): Promise<Request>

  removeUserFromCompany(id: string): Promise<ApiResponse>

  getUsersWithinAuthUserCompany(): Promise<{ users: User[] }>

  getUsersByCompany(companyId: string): Promise<{ users: User[] }>
}

export class AuthService {
  private currentUser: User | null
  private companies: Company[] | null

  constructor(private auth: firebase.auth.Auth) {
    this.currentUser = null
    this.companies = null
    auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const [user, { companies }] = await Promise.all([
          this.getAuthUser(),
          this.getAllCompanies()
        ])
        this.companies = companies
        this.currentUser = user
      }
    })
  }

  async signOut() {
    return this.auth.signOut()
  }

  isAuthenticated() {
    return this.auth.currentUser !== null
  }

  async login(email: string, password: string): Promise<string | null> {
    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
    if (!user) return null
    await user.getIdToken()
    const loggedInUser = await this.getAuthUser()
    this.currentUser = loggedInUser
    return loggedInUser.id
  }

  async getAuthUser(): Promise<User> {
    const response = await axios.get<User>(`auth/me`)
    return response.data
  }

  async getCurrentUser(force?: boolean): Promise<User> {
    if (force) {
      this.currentUser = null
    }

    if (this.currentUser !== null) {
      return this.currentUser
    }
    const user = await this.getAuthUser()
    this.currentUser = user
    return user
  }

  async getAllCompanies(): Promise<{ companies: Company[] }> {
    const companies = this.companies
    if (companies !== null) return { companies }
    const res = await axios.get<{ companies: Company[] }>("companies")
    return res.data
  }

  async getAuthUserCompany(): Promise<Company | null> {
    const [{ companies }, authUser] = await Promise.all([
      this.getAllCompanies(),
      this.getCurrentUser()
    ])
    return (
      companies.find((company) => company.id === authUser.companyId) ?? null
    )
  }
}

export class APIServiceImpl implements APIService {
  creatUser(email: string, password: string, name: string): Promise<User> {
    return axios.post<SignUpData, User>("auth/signup", {
      email,
      password,
      name
    })
  }

  async getRequestsForAuthUserCompany(): Promise<{ requests: Request[] }> {
    const response = await axios.get<{ requests: Request[] }>("requests")
    return response.data
  }

  async getRequestById(id: string): Promise<Request> {
    const response = await axios.get<Request>(`requests/${id}`)
    const request = { ...response.data }
    request.createdAt = moment(request.createdAt)
    request.updatedAt = moment(request.updatedAt)
    return request
  }

  async updateRequest(request: Request): Promise<Request> {
    return await axios.put<Request, Request>(`requests/${request.id}`, request)
  }

  async createRequest(request: Request): Promise<Request> {
    return await axios.post<Request, Request>(`requests`, request)
  }

  async getUsersWithinAuthUserCompany(): Promise<{ users: User[] }> {
    const response = await axios.get<{ users: User[] }>("companies/users")
    return response.data
  }

  async removeUserFromCompany(id: string): Promise<ApiResponse> {
    const res = await axios.delete<ApiResponse>(`companies/users/${id}`)
    return res.data
  }

  async updateUser(user: Partial<User>): Promise<User> {
    const res = await axios.put(`users/${user.id}`, user)
    return user as User
  }

  async getUsers(): Promise<{ users: User[] }> {
    const res = await axios.get<{ users: User[] }>("/users")
    return res.data
  }

  async getUsersByCompany(companyId: string): Promise<{ users: User[] }> {
    const res = await axios.get<{ users: User[] }>(
      `companies/${companyId}/users`
    )
    return res.data
  }
}
