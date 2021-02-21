import { createContext, useContext } from "react"
import { APIService, AuthService } from "../services/APIService"


export type Service = {
  api: APIService
  auth: AuthService
}

export const APIServiceContext = createContext<Service | null>(null)

export function useClientAPIService(): Service {
  const service = useContext(APIServiceContext)
  if (service === null) {
    throw new Error("API Client not configured")
  }

  return service
}
