import React from "react"
import styles from "./Button.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type Props = {
  label: string
  onClick?: () => void
  loading?: boolean
  fullWith?: boolean
  width?: number | string
}

export function Button(props: Props) {
  const { onClick, label, loading = false, fullWith = false } = props
  return (
    <button
      disabled={loading}
      onClick={onClick}
      type="button"
      className={[styles.button, fullWith ? styles.fullWith : ""].join(" ")}
    >
      {loading && <FontAwesomeIcon spin icon="spinner" />}
      &nbsp;
      {label}
    </button>
  )
}
