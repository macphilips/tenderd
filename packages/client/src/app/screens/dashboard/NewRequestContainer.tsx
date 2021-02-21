import { RequestForm } from "../../components/forms/RequestForm"
import React from "react"
import { useHistory } from "react-router-dom"
import { useClientAPIService } from "../../hooks/useClientAPIService"
import { Request } from "../../services/types"

export function NewRequestContainer() {
  const { api } = useClientAPIService()
  const history = useHistory()

  const onSubmit = async (request: Request) => {
    try {
      await api.createRequest(request)
      history.push("/dashboard")
    } catch (e) {
    }
  }
  return (
    <div className="container">
      <RequestForm onSubmit={onSubmit} />
    </div>
  )
}
