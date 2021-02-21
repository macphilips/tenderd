import React, { useState } from "react"
import { TextInput } from "../InputText"
import { Button } from "../Button"
import styles from "./Form.module.scss"
import { Snackbar } from "../Snackbar"

export type Login = {
  email: string
  password: string
}

export function LoginForm(props: { onSubmit: (user: Login) => Promise<void> }) {
  const [saving, setSaving] = useState(false)
  const [login, setLogin] = useState<Login>({ email: "", password: "" })
  const [error, setError] = useState<string>()
  const onChange = (key: keyof Login, value: string) => {
    setLogin((login) => ({ ...login, [key]: value }))
  }
  const onSubmit = async () => {
    //TODO validate input before submitting
    try {
      setSaving(true)
      await props.onSubmit(login)
    } catch (e) {
      setSaving(false)
      setError("Error logging into the app.")
    }
  }

  return (
    <>
      <Snackbar
        message={error ?? ""}
        show={error !== undefined}
        onDismiss={() => setError(undefined)}
      />
      <div className={styles.root} id="login">
        <h1>Welcome Back!</h1>
        <form>
          <TextInput
            testId="email"
            value={login.email}
            onChange={(value) => onChange("email", value)}
            required={true}
            label="Email"
            type="text"
            color="dark"
          />
          <TextInput
            testId="password"
            value={login.password}
            onChange={(value) => onChange("password", value)}
            required={true}
            label="Password"
            type="password"
            color="dark"
          />
          <Button loading={saving} label="Login" onClick={onSubmit} />
        </form>
      </div>
    </>
  )
}
