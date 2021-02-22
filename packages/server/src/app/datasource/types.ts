interface Model {
  model: string
}
enum RequestType {
  REPLACEMENT = "Replacement",
  MAINTENANCE = "Maintenance",
  DEMOBILISATION = "Demobilisation",
  BREAKDOWN = "Breakdown"
}

enum RequestStatus {
  CREATED = "Created",
  IN_PROGRESS = "InProgress",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled"
}

export interface User {
  id: string
  name: string
  email: string
  password: string
  companyId?: string
  model: "User"
}

export interface Company {
  id: string
  name: string
  model: "Company"
}

export interface Request {
  id: string
  description: string
  resources: string[]
  type: RequestType
  status: RequestStatus
  userId: string
  companyId: string
  createdAt: string
  updatedAt: string
  model: "Request"
}

export enum RequestEventLogType {}

export interface RequestEventLog {
  itemId: string
  type: RequestEventLogType
  actorId: string
  timestamp: string
  model: "RequestEventLog"
}
