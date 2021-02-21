import React from "react"
import { NavLink, Route, Switch, useRouteMatch } from "react-router-dom"
import styles from "./SignupOrLoginScreen.module.scss"
import { SignupContainer } from "./SignupContainer"
import { LoginContainer } from "./LoginContainer"

export function SignupOrLoginScreen() {
  let { path, url } = useRouteMatch()
  return (
    <div className={styles.root}>
      <div className={styles.tabGroup}>
        <div className={styles.tab}>
          <NavLink to={`${url}/signup`} activeClassName={styles.active}>
            Sign Up
          </NavLink>
        </div>
        <div className={styles.tab}>
          <NavLink to={`${url}/login`} activeClassName={styles.active}>
            Login
          </NavLink>
        </div>
      </div>
      <div className={styles.tabContent}>
        <Switch>
          <Route path={path + "/signup"} component={SignupContainer} />
          <Route path={`${path}/login`} component={LoginContainer} />
        </Switch>
      </div>
    </div>
  )
}
