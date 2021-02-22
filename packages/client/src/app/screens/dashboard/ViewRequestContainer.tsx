import { Link, useParams } from "react-router-dom"
import React, { useEffect, useMemo, useState } from "react"
import { useClientAPIService } from "../../hooks/useClientAPIService"
import { Request } from "../../services/types"
import { Loader } from "../../components/Loader"
import { RequestForm } from "../../components/forms/RequestForm"
import { Timeline, TimelineHistory } from "../../components/Timeline"
import moment from "moment"

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

  const eventLogs = request?.eventLogs || []
  const timeline: TimelineHistory[] = eventLogs.map((log, index, array) => {
    // starting from the most recent
    const { timestamp, status, actorName, type } = log
    let title: string
    if (index < eventLogs.length - 1) {
      const prevLog = array[index + 1]
      title = `${actorName} updated request from ${prevLog.status} to ${status}`
    } else {
      title = `Request created by ${actorName}`
    }
    return { time: moment(timestamp), title }
  })

  return (
    <div className="container">
      <RequestForm
        initialValue={request}
        onSubmit={async () => {}}
        mode="View"
      />
      <Timeline label="Status Change History" history={timeline} />
    </div>
  )
}
