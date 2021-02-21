import { Link, useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { useClientAPIService } from "../../hooks/useClientAPIService"
import { Request } from "../../services/types"
import { Loader } from "../../components/Loader"

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
      <dl className="row-md jh-entity-details">
        <>
          <dt>
            <span>Description</span>
          </dt>
          <dd>
            <span>{request?.description ?? "N/A"}</span>
          </dd>
        </>
        <>
          <dt>
            <span>Description</span>
          </dt>
          <dd>
            <span>{request?.description ?? "N/A"}</span>
          </dd>
        </>
        <>
          <dt>
            <span>Status</span>
          </dt>
          <dd>
            <span>{request?.status ?? "N/A"}</span>
          </dd>
        </>
        <>
          <dt>
            <span>Type</span>
          </dt>
          <dd>
            <span>{request?.type ?? "N/A"}</span>
          </dd>
        </>
        <>
          <dt>
            <span>Resources</span>
          </dt>
          <dd>
            <span>
              {request?.resources.map((resource) => (
                <span key={resource}>{resource} </span>
              )) ?? "N/A"}
            </span>
          </dd>
        </>
        <>
          <dt>
            <span>Assigned User</span>
          </dt>
          <dd>
            <span>{request?.userId ?? "N/A"}</span>
          </dd>
        </>
        <>
          <dt>
            <span>Assigned Company</span>
          </dt>
          <dd>
            <span>{request?.companyId ?? "N/A"}</span>
          </dd>
        </>
      </dl>
    </div>
  )
}
