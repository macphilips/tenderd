import { TextInput } from "../InputText"
import { Button } from "../Button"
import React, { useState } from "react"
import { User } from "../../services/types"
import { CompanySelectInput } from "../CompanySelectInput"

export function ProfileForm(props: {
  user: User
  onSubmit: (user: User) => Promise<void>
}) {
  const [saving, setSaving] = useState(false)
  const { user } = props
  const [name, setName] = useState(user.name)
  const [companyId, setCompanyId] = useState(user.companyId || "company-123")
  const onSubmit = async () => {
    try {
      setSaving(true)
      await props.onSubmit({ ...user, companyId, name })
      setSaving(false)
    } catch (e) {
      setSaving(false)
    }
  }
  return (
    <div>
      <form>
        <TextInput
          value={name}
          onChange={(value) => setName(value)}
          label="Name"
          color="light"
          type="text"
        />
        <CompanySelectInput
          value={companyId}
          onChange={(value) => setCompanyId(value)}
          label="Company"
          color="light"
        />
        <Button loading={saving} label="Update" onClick={onSubmit} />
      </form>
    </div>
  )
}
