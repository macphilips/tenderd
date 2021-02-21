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
  userId: string
  companyId: string
}

export interface RequestEventLogType {
}

export interface RequestEventLog {
  itemId: string
  type: RequestEventLog
  actorId: string
  timestamp: string
}
