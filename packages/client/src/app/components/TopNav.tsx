import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, NavLink, useHistory } from "react-router-dom"
import styles from "./TopNave.module.scss"
import { useClientAPIService } from "../hooks/useClientAPIService"

export function TopNav() {
  const history = useHistory()
  const { auth } = useClientAPIService()
  const onLogout = async () => {
    auth.signOut()
    history.replace("/auth/login")
  }
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Link to="/">Tenderd</Link>
      </h1>
      <ul className={styles.mainNav}>
        <li>
          <NavLink to="/dashboard" activeClassName={styles.active}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" activeClassName={styles.active}>
            Settings
          </NavLink>
        </li>
        <li>
          <a onClick={onLogout}>
            <FontAwesomeIcon icon="sign-out-alt" />
            Log out
          </a>
        </li>
      </ul>
    </header>
  )
}
