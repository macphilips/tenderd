import { Request } from "../../datasource/types"

class RequestRepository {
  constructor() {}

  async updateRequest(request: Partial<Request>): Promise<Request> {
    return request as Request
  }

  async createRequest(request: Request): Promise<Request> {
    return request
  }

  async getRequestsUserCompany(companyId: string): Promise<Request[]> {
    return []
  }
}

export default RequestRepository
