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
  disabled?: boolean
}) {
  const {
    value,
    onChange,
    disabled = false,
    required = false,
    label,
    type,
    color = "light"
  } = props
  return (
    <div
      data-testid={props.testId}
      className={`${styles.fieldWrap} ${styles[color]}`}
    >
      <input
        disabled={disabled}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder=" "
        autoComplete="off"
      />
      <label>
        {label}
        {!disabled && required && <span className={styles.req}>*</span>}
      </label>
    </div>
  )
}
