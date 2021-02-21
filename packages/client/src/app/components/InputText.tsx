import React from "react"
import styles from "./InputText.module.scss"

export function TextInput(props: {
  value: string
  onChange: (value: string) => void
  required?: boolean
  label: string
  type: "text" | "password" | "email"
  testId?: string
  color?: "light" | "dark"
}) {
  const {
    value,
    onChange,
    required = false,
    label,
    type,
    color = "light"
  } = props
  return (
    <div data-testid={props.testId} className={`${styles.fieldWrap} ${styles[color]}`}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder=" "
        autoComplete="off"
      />
      <label>
        {label}
        {required && <span className={styles.req}>*</span>}
      </label>
    </div>
  )
}
