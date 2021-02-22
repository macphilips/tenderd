import {
  Request,
  RequestEventLog,
  RequestEventLogType
} from "../../datasource/types"
import { firestore } from "firebase-admin/lib/firestore"
import { Repository, toJSON } from "../../datasource"
import { RequestEventLogModel, RequestModel } from "../../datasource/models"
import { v4 as uuidv4 } from "uuid"

export class RequestEventLogRepository extends Repository<RequestEventLog> {
  protected readonly model
  constructor(protected firestore: firestore.Firestore) {
    super(firestore)
    this.model = RequestEventLogModel
  }
}

class RequestRepository extends Repository<Request> {
  protected model
  constructor(protected firestore: firestore.Firestore) {
    super(firestore)
    this.model = RequestModel
  }

  async getRequestById(requestId: string): Promise<Request | undefined> {
    const request = await this.findByPK(RequestModel.key({ id: requestId }))
    if (!request) return undefined
    const eventLogs = await this.findEventLogs(requestId)
    return { ...request, eventLogs }
  }

  async updateRequest(request: Partial<Request>): Promise<Request> {
    // TODO: move update logic into parent class
    if (!request.id) throw new Error("User id cannot be null")
    const result = await this.getRequestById(request.id)
    if (result == undefined) throw Error("Request not found")
    const update = { ...result, ...request, updatedAt: new Date() }
    await this.update(RequestModel.create(update))
    return update
  }

  async createRequest(request: Request): Promise<Request> {
    const data = { ...request }
    const pk = this.model.pkField
    if (!data[pk]) {
      data[pk] = uuidv4()
    }

    await this.create(
      RequestModel.create({
        ...data
      })
    )
    return data
  }

  async createEventLog(
    data: Request,
    actorId: string,
    actorName: string,
    update = false
  ) {
    const log = {
      actorId,
      actorName,
      status: data.status,
      timestamp: firestore.Timestamp.now(),
      type: update ? RequestEventLogType.UPDATE : RequestEventLogType.CREATE
    }
    await this.firestore
      .collection(this.model.name)
      .doc(data[this.model.pkField])
      .collection(RequestEventLogModel.name)
      .doc()
      .set(log)
  }

  async findEventLogs(requestId: string): Promise<RequestEventLog[]> {
    const snapshot = await this.firestore
      .collection(this.model.name)
      .doc(requestId)
      .collection(RequestEventLogModel.name)
      .get()
    let results: RequestEventLog[] = []
    snapshot.forEach((doc) => {
      results.push(toJSON<RequestEventLog>(doc.data()))
    })

    return results
  }

  async findAllRequestsForCompany(companyId: string): Promise<Request[]> {
    return this.findAllBy("companyId", companyId)
  }

  async findAllRequestsForUser(userId: string): Promise<Request[]> {
    return this.findAllBy("assignedUserId", userId)
  }
}

export default RequestRepository
