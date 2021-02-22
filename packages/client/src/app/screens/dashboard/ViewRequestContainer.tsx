import { Link, useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { useClientAPIService } from "../../hooks/useClientAPIService"
import { Request } from "../../services/types"
import { Loader } from "../../components/Loader"
import { RequestForm } from "../../components/forms/RequestForm"

export function ViewRequestContainer() {
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
      } finally {
        setLoading(false)
      }
    }
    getRequestById()
  }, [requestId])
  if (loading) return <Loader />

  return (
    <div className="container">
      <div>
        <Link to="/dashboard">{"<Back to Dashboard"}</Link>&nbsp;
        <h1>View Request {requestId}</h1>
      </div>
      <RequestForm
        initialValue={request}
        onSubmit={async () => {}}
        mode="View"
      />
    </div>
  )
}
