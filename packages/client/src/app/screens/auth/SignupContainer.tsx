import { useClientAPIService } from "../../hooks/useClientAPIService"
import { SignUpData, SignUpForm } from "../../components/forms/SignUpForm"
import React from "react"
import { useHistory } from "react-router-dom"

export function SignupContainer() {
  const { api, auth } = useClientAPIService()
  const history = useHistory()
  const onSignUp = async (user: SignUpData) => {
    const { email, password, name } = user
    await api.creatUser(email, password, name)
    await auth.login(email, password)
    history.push("/auth/select-company")
  }
  return <SignUpForm onSubmit={onSignUp} />
}
