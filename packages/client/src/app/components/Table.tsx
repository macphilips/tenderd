import React from "react"
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome"
import styles from "./Table.module.scss"

type Column<T> = {
  label: string
  field: keyof T
}

type Action = { title: string; icon: FontAwesomeIconProps["icon"] }
type Props<T> = {
  data: T[]
  columns: Column<T>[]
  actions?: Action[]
  onActionItemClick?: (title: string, data: T) => void
  fullWidth?: boolean
}

export function Table<T extends { id: string }>(props: Props<T>) {
  const {
    data,
    actions = [],
    fullWidth = false,
    onActionItemClick = (_, __) => {
    }
  } = props
  const showAction = actions.length > 0
  const columns = props.columns.map(({ label }) => <th key={label}>{label}</th>)

  const rows = data.map((row) => (
    <tr key={`row-${row["id"]}`}>
      {props.columns.map(({ field }) => (
        <td key={`${row["id"]}-${row[field]}`}>{row[field]}</td>
      ))}
      {showAction && (
        <td key={`${row["id"]}-action`}>
          <TableAction
            onActionItemClick={(_) => onActionItemClick(_, row)}
            actions={props.actions || []}
          />
        </td>
      )}
    </tr>
  ))
  if (showAction) {
    columns.push(<th key="action-column" />)
  }
  return (
    <div className={styles.root}>
      <table className={fullWidth ? styles.fullWidth : ""}>
        <thead>
        <tr>{columns}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  )
}

function TableAction(props: {
  actions: Action[]
  onActionItemClick?: (title: string) => void
}) {
  const {
    actions, onActionItemClick = (_) => {
    }
  } = props
  return (
    <span className={styles.tableAction}>
      {actions.map((action) => (
        <span
          data-hint={action.title}
          className={styles.hint}
          key={action.title}
          onClick={() => onActionItemClick(action.title)}
        >
          <span />
          <FontAwesomeIcon size={"sm"} icon={action.icon} />
        </span>
      ))}
    </span>
  )
}
