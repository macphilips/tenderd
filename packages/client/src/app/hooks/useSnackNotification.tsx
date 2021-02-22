import React, { createContext, ReactNode, useContext, useState } from "react"
import { Snackbar } from "../components/Snackbar"
import { Service } from "./useClientAPIService"

type Props = {
  showNotification: (message: string) => void
}
const SnackNotification = createContext<Props | null>(null)

export function SnackProvider(props: { children: ReactNode }) {
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState("")
  const showNotification = (message: string) => {
    setMessage(message)
    setShow(true)
  }
  const onDismiss = () => {
    setMessage("")
    setShow(false)
  }
  return (
    <SnackNotification.Provider value={{ showNotification }}>
      {props.children}
      <Snackbar message={message} show={show} onDismiss={onDismiss} />
    </SnackNotification.Provider>
  )
}

export function useSnackNotification(): Props {
  const context = useContext(SnackNotification)
  if (context === null) throw new Error("Not configured")

  return context
}
