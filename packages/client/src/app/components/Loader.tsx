import React from "react"
import styles from "./Loader.module.scss"

export function Loader() {
  return (
    <div className={styles.root}>
      <span>Loading..</span>
    </div>
  )
}
