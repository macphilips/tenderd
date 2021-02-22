import React, { useEffect, useState } from "react"
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom"
import { Request } from "../../services/types"
import { useClientAPIService } from "../../hooks/useClientAPIService"
import { Table } from "../../components/Table"
import { ViewRequestContainer } from "./ViewRequestContainer"
import { EditOrCreateRequestContainer } from "./EditOrCreateRequestContainer"
import styles from "./Dashboard.module.scss"
import { Loader } from "../../components/Loader"
import moment, { Moment } from "moment"
import { useSnackNotification } from "../../hooks/useSnackNotification"

export function DashboardScreen() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route exact path={`${path}`} component={Main} />
      <Route
        exact
        path={`${path}/new`}
        component={() => <EditOrCreateRequestContainer mode="Create" />}
      />
      <Route
        exact
        path={`${path}/view/:requestId`}
        component={ViewRequestContainer}
      />
      <Route
        path={`${path}/edit/:requestId`}
        component={() => <EditOrCreateRequestContainer mode="Edit" />}
      />
    </Switch>
  )
}

export function Main() {
  const { url } = useRouteMatch()
  const history = useHistory()
  const { api } = useClientAPIService()
  const [loading, setLoading] = useState(false)
  const [requests, setRequests] = useState<Request[]>([])
  const { showNotification } = useSnackNotification()
  useEffect(() => {
    const getRequest = async () => {
      try {
        setLoading(true)
        const { requests } = await api.getRequestsForAuthUserCompany()
        setRequests(requests)
      } catch (e) {
        showNotification("Unable to load request list")
      } finally {
        setLoading(false)
      }
    }
    getRequest()
  }, [])

  if (loading) return <Loader />

  const dateFormatter = (value: Moment) =>
    moment(value).format("DD/MM/YYYY HH:mm")
  return (
    <div className={[styles.root, ""].join(" ")}>
      <div className={styles.header}>
        <h1>Dashboard</h1>
        <button
          onClick={() => history.push(`${url}/new`)}
          className={styles.btn}
        >
          Add new Request
        </button>
      </div>
      <Table
        fullWidth
        data={requests}
        columns={[
          { field: "description", label: "Description" },
          { field: "status", label: "Status" },
          { field: "type", label: "Type" },
          { field: "assignedUserName", label: "Assigned User" },
          {
            field: "createdAt",
            label: "Created Date",
            formatter: dateFormatter
          },
          {
            field: "updatedAt",
            label: "Last Modified",
            formatter: dateFormatter
          }
        ]}
        actions={[
          { title: "View", icon: "eye" },
          { title: "Edit", icon: "pencil-alt" }
        ]}
        onActionItemClick={(title, data) => {
          if (title === "Edit") {
            history.push(`${url}/edit/${data.id}`)
          } else if (title === "View") {
            history.push(`${url}/view/${data.id}`)
          }
        }}
      />
    </div>
  )
}
