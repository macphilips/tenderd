import React from "react"
import styles from "./Settings.module.scss"
import { NavLink, Redirect, Route, Switch, useRouteMatch } from "react-router-dom"
import { CompanyUserList } from "./CompanyUserList"
import { ProfileContainer } from "./ProfileContainer"

export function SettingsScreen() {
  const { path, url } = useRouteMatch()
  return (
    <div className={`${styles.root} container`}>
      <div className={styles.tabs}>
        <NavLink
          to={`${url}/profile`}
          className={styles.tab}
          activeClassName={styles.active}
        >
          Profile
        </NavLink>
        <NavLink
          to={`${url}/users`}
          className={styles.tab}
          activeClassName={styles.active}
        >
          Users
        </NavLink>
      </div>
      <Switch>
        <Route path={`${path}/profile`} component={ProfileContainer} />
        <Route path={`${path}/users`} component={CompanyUserList} />
        <Route
          path={`${path}`}
          render={() => <Redirect to={`${url}/profile`} />}
        />
      </Switch>
    </div>
  )
}
