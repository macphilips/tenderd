import React, { useEffect, useState } from "react"
import { useClientAPIService } from "../hooks/useClientAPIService"
import { Option, SelectInput } from "./SelectInputs"

export function CompanySelectInput(props: {
  value: string
  onChange: (value: string) => void
  required?: boolean
  label: string
  testId?: string
  color?: "light" | "dark"
}) {
  const { auth } = useClientAPIService()
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState<Option[]>([])

  useEffect(() => {
    const getAllCompanies = async () => {
      const { companies } = await auth.getAllCompanies()
      setLoading(false)
      setOptions(companies.map(({ name, id }) => ({ value: id, text: name })))
    }
    getAllCompanies()
  }, [])

  return (
    <SelectInput
      loading={loading}
      label={props.label}
      testId={props.testId}
      required={props.required}
      value={props.value}
      options={options}
      onChange={props.onChange}
      color={props.color}
    />
  )
}
