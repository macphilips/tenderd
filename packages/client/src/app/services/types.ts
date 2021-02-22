import moment, { Moment } from "moment"

export enum RequestType {
  REPLACEMENT = "Replacement",
  MAINTENANCE = "Maintenance",
  DEMOBILISATION = "Demobilisation",
  BREAKDOWN = "Breakdown"
}

export enum RequestStatus {
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
}

export interface Company {
  id: string
  name: string
}

export interface Request {
  id: string
  description: string
  resources: string[]
  type: RequestType
  status: RequestStatus
  assignedUserId: string
  assignedUserName: string
  companyId: string
  companyName: string
  createdAt: Moment
  updatedAt: Moment
  eventLogs?: RequestEventLog[]
}

export enum RequestEventLogType {
  CREATE = "CREATE",
  UPDATE = "UPDATE"
}

export interface RequestEventLog {
  id: string
  status: RequestStatus
  type: RequestEventLogType
  actorId: string
  actorName: string
  timestamp: string
  model: "RequestEventLog"
}
