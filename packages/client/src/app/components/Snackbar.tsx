import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react"
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

const SnackNotification = createContext<{
  showNotification: (message: string) => void
} | null>(null)

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

function useSnackNotification() {
  const context = useContext(SnackNotification)
  if (context) throw new Error("Not configured")

  return context
}
