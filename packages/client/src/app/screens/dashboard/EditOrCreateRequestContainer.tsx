import { useHistory, useParams } from "react-router-dom"
import {
  Company,
  Request,
  RequestStatus,
  RequestType,
  User
} from "../../services/types"
import {
  defaultRequestValue,
  Mode,
  RequestForm
} from "../../components/forms/RequestForm"
import React, { useEffect, useState } from "react"
import { useClientAPIService } from "../../hooks/useClientAPIService"
import { Loader } from "../../components/Loader"
import { useSnackNotification } from "../../hooks/useSnackNotification"

export function EditOrCreateRequestContainer(props: { mode: Mode }) {
  const history = useHistory()
  const { requestId } = useParams<{ requestId?: string }>()
  const { api } = useClientAPIService()
  const [request, setRequest] = useState<Request | undefined>()
  const [loading, setLoading] = useState(false)
  const { showNotification } = useSnackNotification()

  useEffect(() => {
    const getRequestById = async () => {
      try {
        if (!requestId) return
        setLoading(true)
        let request
        request = await api.getRequestById(requestId)
        setRequest(request)
        setLoading(false)
      } catch (e) {
        showNotification("Unable to fetch Request")
        setLoading(false)
      }
    }
    getRequestById()
  }, [requestId])

  const onSubmit = async (request: Request) => {
    try {
      if (props.mode === "Edit") {
        await api.updateRequest(request)
      } else if (props.mode === "Create") {
        await api.createRequest(request)
      }
      history.push("/dashboard")
    } catch (e) {}
  }

  if (loading) return <Loader />

  return (
    <div className="container">
      <RequestForm
        mode={props.mode}
        initialValue={request ?? defaultRequestValue}
        onSubmit={onSubmit}
      />
    </div>
  )
}
