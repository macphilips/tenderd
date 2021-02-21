import axios from "axios"
import { SignUpData } from "../components/forms/SignUpForm"
import firebase from "firebase"
import { Company, Request, User } from "./types"

export type ApiResponse = {
  success: boolean
  message: string
}

export interface APIService {
  creatUser(email: string, password: string, name: string): Promise<User>

  updateUser(user: User): Promise<User>

  getUsers(): Promise<{ users: User[] }>

  getRequests(): Promise<{ requests: Request[] }>

  updateRequest(request: Request): Promise<Request>

  createRequest(request: Request): Promise<Request>

  getRequestById(id: string): Promise<Request>

  removeUserFromCompany(id: string): Promise<ApiResponse>
}

export class AuthService {
  private currentUser: User | null
  private companies: Company[] | null

  constructor(private auth: firebase.auth.Auth) {
    this.currentUser = null
    this.companies = null
    auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        this.getAuthUser().then((user) => {
          this.currentUser = user
        })
      }
      this.getAllCompanies().then(({ companies }) => {
        this.companies = companies
      })
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

  async getCurrentUser(): Promise<User> {
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
}

export class APIServiceImpl implements APIService {
  creatUser(email: string, password: string, name: string): Promise<User> {
    return axios.post<SignUpData, User>("auth/signup", {
      email,
      password,
      name
    })
  }

  async getRequests(): Promise<{ requests: Request[] }> {
    const response = await axios.get<{ requests: Request[] }>("requests")
    return response.data
  }

  async getRequestById(id: string): Promise<Request> {
    const response = await axios.get<Request>(`requests/${id}`)
    return response.data
  }

  async updateRequest(request: Request): Promise<Request> {
    return await axios.put<Request, Request>(`requests/${request.id}`, request)
  }

  async createRequest(request: Request): Promise<Request> {
    return await axios.put<Request, Request>(`requests`, request)
  }

  async getUsers(): Promise<{ users: User[] }> {
    const response = await axios.get<{ users: User[] }>("companies/users")
    return response.data
  }

  async removeUserFromCompany(id: string): Promise<ApiResponse> {
    const res = await axios.get<ApiResponse>(`companies/users/${id}`)
    return res.data
  }

  updateUser(user: User): Promise<User> {
    throw new Error("Method not implemented.")
  }
}
