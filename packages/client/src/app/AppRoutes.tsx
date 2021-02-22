import React, { ReactElement } from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { TopNav } from "./components/TopNav"
import { SecureRoute } from "./SecureRoute"
import { SettingsScreen } from "./screens/settings/SettingsScreen"
import { DashboardScreen } from "./screens/dashboard/DashboardScreen"
import { SignupOrLoginScreen } from "./screens/auth/SignupOrLoginScreen"
import { ChooseCompanyScreen } from "./screens/auth/ChooseCompanyScreen"

export function AppRoutes() {
  return (
    <Switch>
      <SecureRoute
        path="/dashboard"
        component={withScreen(<DashboardScreen />)}
      />
      <SecureRoute
        path="/settings"
        component={withScreen(<SettingsScreen />)}
      />
      <Route
        exact
        path="/auth/select-company"
        render={() => <ChooseCompanyScreen />}
      />
      <Route path="/auth" render={() => <SignupOrLoginScreen />} />
      <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
    </Switch>
  )
}

function withScreen(component: ReactElement): (...args: any) => ReactElement {
  return (...args) => (
    <>
      <TopNav />
      {component}
    </>
  )
}
