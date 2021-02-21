import React, { useState } from "react"
import { TextInput } from "../InputText"
import { Button } from "../Button"
import { SelectInput } from "../SelectInputs"
import { Request, RequestStatus, RequestType } from "../../services/types"

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

const defaultValue: Request = {
  companyId: "", userId: "",
  description: "",
  id: "",
  resources: [],
  status: RequestStatus.CREATED,
  type: RequestType.BREAKDOWN
}

export function RequestForm(props: {
  onSubmit: (user: Request) => Promise<void>
  initialValue?: Request
}) {
  const [request, setUser] = useState<Request>(
    props.initialValue || defaultValue
  )
  const onChange = (key: keyof Request, value: string) => {
    setUser((user) => ({ ...user, [key]: value }))
  }

  const onSubmit = () => {
    //TODO validate input before submitting
    props.onSubmit(request)
  }
  const title =
    props.initialValue === undefined ? "Create new Request" : "Edit Request"
  return (
    <div id="requestForm">
      <h1>{title}</h1>
      <hr />
      <br />
      <form>
        <TextInput
          testId="description"
          value={request.description}
          onChange={(value) => onChange("description", value)}
          required={true}
          label="Description"
          type="text"
        />
        <SelectInput
          options={requestStatusOptions}
          testId="requestStatusOptions"
          value={request.status}
          onChange={(value) => onChange("status", value)}
          required={true}
          label="Status"
        />
        <SelectInput
          options={requestTypeOptions}
          testId="requestTypeOptions"
          value={request.type}
          onChange={(value) => onChange("status", value)}
          required={true}
          label="Type"
        />
        <Button label="Save" onClick={onSubmit} />
      </form>
    </div>
  )
}
