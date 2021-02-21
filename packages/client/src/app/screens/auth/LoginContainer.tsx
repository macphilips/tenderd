import { useClientAPIService } from "../../hooks/useClientAPIService"
import { useHistory } from "react-router-dom"
import { Login, LoginForm } from "../../components/forms/LoginForm"
import React from "react"

export function LoginContainer() {
  const { auth } = useClientAPIService()
  const history = useHistory()

  const onLogin = async ({ email, password }: Login) => {
    const uid = await auth.login(email, password)
    if (uid) {
      return history.push("/dashboard")
    }
  }
  return <LoginForm onSubmit={onLogin} />
}
