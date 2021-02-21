import { useHistory, useParams } from "react-router-dom"
import { Request, RequestStatus, RequestType } from "../../services/types"
import { RequestForm } from "../../components/forms/RequestForm"
import React, { useEffect, useState } from "react"
import { useClientAPIService } from "../../hooks/useClientAPIService"
import { Loader } from "../../components/Loader"

const defaultValue: Request = {
  companyId: "",
  userId: "",
  description: "text",
  id: "0",
  resources: [],
  status: RequestStatus.CREATED,
  type: RequestType.BREAKDOWN
}

export function EditRequestContainer() {
  const history = useHistory()

  const { requestId } = useParams<{ requestId: string }>()
  const { api } = useClientAPIService()
  const [request, setRequest] = useState<Request>()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const getRequestById = async () => {
      try {
        setLoading(true)
        const request = await api.getRequestById(requestId)
        setLoading(true)
        setRequest(request)
      } catch (e) {
        //TODO: Show error notification
      }
    }
    getRequestById()
  }, [requestId])

  const onSubmit = async (request: Request) => {
    try {
      await api.updateRequest(request)
      history.push("/dashboard")
    } catch (e) {
    }
  }

  if (loading) return <Loader />
  return (
    <div className="container">
      <RequestForm initialValue={request ?? defaultValue} onSubmit={onSubmit} />
    </div>
  )
}

