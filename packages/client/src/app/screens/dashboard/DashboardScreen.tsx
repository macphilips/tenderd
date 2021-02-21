import React, { useEffect, useState } from "react"
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom"
import { Request } from "../../services/types"
import { useClientAPIService } from "../../hooks/useClientAPIService"
import { Table } from "../../components/Table"
import { ViewRequestContainer } from "./ViewRequestContainer"
import { EditRequestContainer } from "./EditRequestContainer"
import { NewRequestContainer } from "./NewRequestContainer"
import styles from "./Dashboard.module.scss"
import { Loader } from "../../components/Loader"

export function DashboardScreen() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route exact path={`${path}`} component={Main} />
      <Route exact path={`${path}/new`} component={NewRequestContainer} />
      <Route
        exact
        path={`${path}/view/:requestId`}
        component={ViewRequestContainer}
      />
      <Route
        path={`${path}/edit/:requestId`}
        component={EditRequestContainer}
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
  useEffect(() => {
    const getRequest = async () => {
      try {
        setLoading(true)
        const { requests } = await api.getRequests()
        setLoading(false)
        setRequests(requests)
      } catch (e) {
        //TODO: Show snack notification here
      }
    }
    getRequest()
  }, [])

  if (loading) return <Loader />

  return (
    <div className={[styles.root, "container"].join(" ")}>
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
          { field: "userId", label: "Assigned User" },
          { field: "companyId", label: "Assigned Company" }
        ]}
        actions={[{ title: "Edit", icon: "pencil" }]}
        onActionItemClick={(title, data) => {
          if (title === "Edit") {
            history.push(`${url}/edit/${data.id}`)
          } else if (title === "view") {
            history.push(`${url}/view/${data.id}`)
          }
        }}
      />
    </div>
  )
}
