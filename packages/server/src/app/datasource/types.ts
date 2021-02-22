interface Model {
  model: string
}

interface Audit {
  updatedAt?: Date
  created?: Date
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

export interface User extends Audit {
  id: string
  name: string
  email: string
  password: string
  companyId?: string
  model: "User"
}

export interface Company extends Audit {
  id: string
  name: string
  model: "Company"
}

export interface Request extends Audit {
  id: string
  description: string
  resources: string[]
  type: RequestType
  status: RequestStatus
  assignedUserId: string
  assignedUserName: string
  companyId: string
  companyName: string
  eventLogs?: RequestEventLog[]
  model: "Request"
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
