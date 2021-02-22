import React, { useEffect, useState } from "react"
import styles from "./SelectInput.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export type Option = { text: string; value: any }

type Props = {
  value: string
  onChange: (value: string) => void
  required?: boolean
  label: string
  testId?: string
  color?: "light" | "dark"
  loading?: boolean
  options: Option[]
  disabled?: boolean
}

export function SelectInput(props: Props) {
  const {
    required = false,
    label,
    color = "light",
    loading = false,
    disabled = false
  } = props
  const [value, setValue] = useState("")
  const [show, setShow] = useState(false)

  useEffect(() => {
    const text = props.options.find((_) => _.value === props.value)?.text
    setValue(text || props.value)
  }, [props.value, props.options])

  return (
    <>
      <div className={styles.root}>
        <div className={`${styles.autocompleteDropdown} ${styles[color]}`}>
          <input
            disabled={disabled}
            className={styles.input}
            value={value}
            onChange={() => {}}
            required={required}
            placeholder=" "
            autoComplete="off"
            onClick={() => setShow(!show)}
          />
          <label>
            {label}
            {!disabled && required && <span className={styles.req}>*</span>}
          </label>
          <span className={styles.inputArrow}>
            {loading ? (
              <FontAwesomeIcon spin icon="spinner" />
            ) : (
              <FontAwesomeIcon
                onClick={() => setShow(!show)}
                icon="caret-down"
              />
            )}
          </span>
        </div>
        <div
          className={[
            styles.listContainer,
            !disabled && show ? styles.show : ""
          ].join(" ")}
        >
          <ul className={styles.list}>
            {props.options.map(({ text, value }) => (
              <li
                onClick={() => {
                  props.onChange(value)
                  setValue(text)
                  setShow(false)
                }}
                key={value}
                className={styles.item}
              >
                <div>
                  <input
                    disabled={true}
                    type="checkbox"
                    checked={props.value === value}
                  />
                  <span>{text}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
