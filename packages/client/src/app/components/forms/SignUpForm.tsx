import React, { useState } from "react"
import { TextInput } from "../InputText"
import { Button } from "../Button"
import styles from "./Form.module.scss"
import { Snackbar } from "../Snackbar"

export type SignUpData = { email: string; password: string; name: string }

export function SignUpForm(props: {
  onSubmit: (user: SignUpData) => Promise<void>
}) {
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState<SignUpData>({
    email: "",
    password: "",
    name: ""
  })
  const [error, setError] = useState<string>()

  const onChange = (key: keyof SignUpData, value: string) => {
    setUser((user) => ({ ...user, [key]: value }))
  }

  const onSubmit = async () => {
    //TODO validate input before submitting
    try {
      setSaving(true)
      await props.onSubmit(user)
    } catch (e) {
      // TODO: better error notification
      setSaving(false)
      setError("Error creating user.")
    }
  }

  return (
    <>
      <Snackbar
        message={error ?? ""}
        show={error !== undefined}
        onDismiss={() => setError(undefined)}
      />
      <div className={styles.root} id="signup">
        <h1>Sign Up for Free</h1>
        <form>
          <TextInput
            testId="name"
            value={user.name}
            onChange={(value) => onChange("name", value)}
            required={true}
            label="Name"
            type="text"
            color="dark"
          />
          <TextInput
            testId="email"
            value={user.email}
            onChange={(value) => onChange("email", value)}
            required={true}
            label="Email"
            type="text"
            color="dark"
          />
          <TextInput
            testId="password"
            value={user.password}
            onChange={(value) => onChange("password", value)}
            required={true}
            label="Password"
            type="password"
            color="dark"
          />
          <Button loading={saving} label="Sign up" onClick={onSubmit} />
        </form>
      </div>
    </>
  )
}
