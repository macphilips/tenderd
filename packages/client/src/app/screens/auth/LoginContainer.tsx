import { useClientAPIService } from "../../hooks/useClientAPIService"
import { useHistory } from "react-router-dom"
import { Login, LoginForm } from "../../components/forms/LoginForm"
import React from "react"

export function LoginContainer() {
  const { auth } = useClientAPIService()
  const history = useHistory()

  const onLogin = async ({ email, password }: Login) => {
    await auth.login(email, password)
    const user = await auth.getCurrentUser()
    if (user.companyId) {
      return history.replace("/dashboard")
    } else {
      history.push("/auth/select-company")
    }
  }
  return <LoginForm onSubmit={onLogin} />
}
