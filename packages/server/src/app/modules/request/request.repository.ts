import { Request } from "../../datasource/types"
import { firestore } from "firebase-admin/lib/firestore"
import { Repository } from "../../datasource"

class RequestRepository extends Repository<Request> {
  constructor(protected firestore: firestore.Firestore) {
    super(firestore)
  }

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
