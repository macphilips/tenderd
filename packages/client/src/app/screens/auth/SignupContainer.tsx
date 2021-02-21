import { useClientAPIService } from "../../hooks/useClientAPIService"
import { SignUpData, SignUpForm } from "../../components/forms/SignUpForm"
import React from "react"

export function SignupContainer() {
  const { api } = useClientAPIService()
  const onSignUp = async (user: SignUpData) => {
    const { email, password, name } = user
    await api.creatUser(email, password, name)
  }
  return <SignUpForm onSubmit={onSignUp} />
}
