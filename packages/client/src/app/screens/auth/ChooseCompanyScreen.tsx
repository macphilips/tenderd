import { useClientAPIService } from "../../hooks/useClientAPIService"
import React, { useState } from "react"
import styles from "./SignupOrLoginScreen.module.scss"
import { useHistory } from "react-router-dom"
import { CompanySelectInput } from "../../components/CompanySelectInput"
import { Button } from "../../components/Button"
import { useSnackNotification } from "../../hooks/useSnackNotification"

export function ChooseCompanyScreen() {
  const { showNotification } = useSnackNotification()
  const history = useHistory()
  const [selectedCompanyId, setSelectedValue] = useState("")
  const [saving, setSaving] = useState(false)
  const { api, auth } = useClientAPIService()
  const updateUser = async () => {
    try {
      setSaving(true)
      const { email, name, id } = await auth.getCurrentUser()
      await api.updateUser({ email, id, name, companyId: selectedCompanyId })
      setSaving(false)
      history.replace("/dashboard")
    } catch (e) {
      showNotification("Unable update user")
      setSaving(false)
    }
  }
  return (
    <div className={styles.root}>
      <div className={styles.tabContent}>
        <CompanySelectInput
          value={selectedCompanyId}
          onChange={setSelectedValue}
          label="Select a Company from the dropdown"
        />
      </div>
      <Button loading={saving} fullWith label={"Save"} onClick={updateUser} />
    </div>
  )
}
