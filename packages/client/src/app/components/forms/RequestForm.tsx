import React, { useEffect, useState } from "react"
import { TextInput } from "../InputText"
import { Button } from "../Button"
import { Option, SelectInput } from "../SelectInputs"
import {
  Company,
  Request,
  RequestStatus,
  RequestType,
  User
} from "../../services/types"
import moment from "moment"
import { useClientAPIService } from "../../hooks/useClientAPIService"

const requestStatusOptions = [
  { text: RequestStatus.CREATED, value: RequestStatus.CREATED },
  { text: RequestStatus.IN_PROGRESS, value: RequestStatus.IN_PROGRESS },
  { text: RequestStatus.COMPLETED, value: RequestStatus.COMPLETED },
  { text: RequestStatus.CANCELLED, value: RequestStatus.CANCELLED }
]

const requestTypeOptions = [
  { text: RequestType.BREAKDOWN, value: RequestType.BREAKDOWN },
  { text: RequestType.MAINTENANCE, value: RequestType.MAINTENANCE },
  { text: RequestType.DEMOBILISATION, value: RequestType.DEMOBILISATION },
  { text: RequestType.REPLACEMENT, value: RequestType.REPLACEMENT }
]

export const defaultRequestValue: Request = {
  assignedUserId: "",
  assignedUserName: "",
  createdAt: moment(),
  updatedAt: moment(),
  companyName: "",
  companyId: "",
  description: "",
  id: "",
  resources: [],
  status: RequestStatus.CREATED,
  type: RequestType.BREAKDOWN
}

export type Mode = "Edit" | "Create" | "View"
type Props = {
  onSubmit: (user: Request) => Promise<void>
  initialValue?: Request
  mode: Mode
}

export function RequestForm(props: Props) {
  const { api, auth } = useClientAPIService()
  const [users, setUsers] = useState<User[]>([])
  const [companies, setCompanies] = useState<Company[]>([])

  const [companyOptions, setCompanyOptions] = useState<Option[]>([])
  const [userOptions, setUserOptions] = useState<Option[]>([])

  const [loadingCompany, setLoadingCompany] = useState(false)
  const [loadingUser, setLoadingUser] = useState(false)

  const [saving, setSaving] = useState(false)

  const [request, setRequest] = useState<Request>(
    props.initialValue || defaultRequestValue
  )

  useEffect(() => {
    const getAllCompanies = async () => {
      try {
        setLoadingCompany(true)
        const { companies } = await auth.getAllCompanies()
        const companyOptions = companies.map(({ id: value, name: text }) => ({
          value,
          text
        }))
        setCompanies(companies)
        setCompanyOptions(companyOptions)
      } catch (e) {
      } finally {
        setLoadingCompany(false)
      }
    }
    getAllCompanies()
  }, [])

  useEffect(() => {
    if (!request.companyId) return

    const loadUsersByCompany = async () => {
      try {
        setLoadingUser(true)
        const { users } = await api.getUsersByCompany(request.companyId)
        const userOptions = users.map(({ id: value, name: text }) => ({
          value,
          text
        }))
        setUsers(users)
        setUserOptions(userOptions)
      } catch (e) {
      } finally {
        setLoadingUser(false)
      }
    }
    loadUsersByCompany()
  }, [request.companyId])

  const disabled = props.mode === "View"

  const onChange = (key: keyof Request, value: string) => {
    setRequest((user) => ({ ...user, [key]: value }))
  }

  const onSubmit = async () => {
    try {
      setSaving(true)
      const { assignedUserId, companyId } = request
      const assignedUserName =
        users.find(({ id }) => id === assignedUserId)?.name ?? ""
      const companyName =
        companies.find(({ id }) => id === companyId)?.name ?? ""

      await props.onSubmit({
        ...request,
        assignedUserName,
        companyName
      })
    } catch (e) {
      setSaving(true)
    }
  }

  const title = `${props.mode} Request`

  return (
    <div id="requestForm">
      <h1>{title}</h1>
      <hr />
      <form>
        <TextInput
          disabled={disabled}
          testId="description"
          value={request.description}
          onChange={(value) => onChange("description", value)}
          required={true}
          label="Description"
          type="text"
        />
        <SelectInput
          disabled={disabled}
          options={requestStatusOptions}
          testId="requestStatusOptions"
          value={request.status}
          onChange={(value) => onChange("status", value)}
          required={true}
          label="Status"
        />
        <SelectInput
          disabled={disabled}
          options={requestTypeOptions}
          testId="requestTypeOptions"
          value={request.type}
          onChange={(value) => onChange("type", value)}
          required={true}
          label="Type"
        />
        <SelectInput
          loading={loadingCompany}
          disabled={disabled}
          options={companyOptions}
          testId="company"
          value={request.companyId}
          onChange={(value) => onChange("companyId", value)}
          required={true}
          label="Assign Company"
        />
        <SelectInput
          loading={loadingUser}
          disabled={disabled}
          options={userOptions}
          testId="author"
          value={request.assignedUserId}
          onChange={(value) => onChange("assignedUserId", value)}
          required={true}
          label="Assign Author"
        />
        {disabled && (
          <Button loading={saving} label="Save" onClick={onSubmit} />
        )}
      </form>
    </div>
  )
}
