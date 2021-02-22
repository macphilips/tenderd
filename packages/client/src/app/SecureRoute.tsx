import React, { useEffect, useState } from "react"
import { Redirect, Route, RouteProps } from "react-router-dom"
import { useClientAPIService } from "./hooks/useClientAPIService"
import firebase from "firebase"
import { Loader } from "./components/Loader"

enum State {
  LOADING,
  COMPLETE
}

type Props = Omit<RouteProps, "render">

export function SecureRoute(props: Props) {
  const { auth } = useClientAPIService()
  const [state, setState] = useState(State.LOADING)
  useEffect(() => {
    const unsub = firebase.auth().onAuthStateChanged(() => {
      setState(State.COMPLETE)
    })
    return () => unsub()
  }, [])
  switch (state) {
    case State.LOADING:
      return <Loader />
    case State.COMPLETE:
      return auth.isAuthenticated() ? (
        <Route
          path={props.path}
          exact={props.exact}
          strict={props.strict}
          sensitive={props.sensitive}
          component={props.component}
        />
      ) : (
        <Redirect to="/auth/login" />
      )
    default:
      return <div>??</div>
  }
}
