import React, { createContext, ReactNode, useEffect, useState } from "react"
import styles from "./Snackbar.module.scss"

type Props = {
  message: string
  show: boolean
  onDismiss: () => void
  dismissAfter?: number
}

export function Snackbar(props: Props) {
  useEffect(() => {
    const id = setTimeout(() => props.onDismiss(), props.dismissAfter ?? 3000)
    return () => clearTimeout(id)
  }, [props.onDismiss, props.dismissAfter])

  return (
    <div
      className={[styles.root, props.show ? styles.show : ""].join(" ")}
      id="snackbar"
    >
      <span className={styles.content}>{props.message}</span>{" "}
      <button className={styles.btn}>Dismiss</button>
    </div>
  )
}
