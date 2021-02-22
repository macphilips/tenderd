import { Table } from "../../components/Table"
import React, { useEffect, useRef, useState } from "react"
import { useClientAPIService } from "../../hooks/useClientAPIService"
import { User } from "../../services/types"
import { Loader } from "../../components/Loader"
import { useSnackNotification } from "../../hooks/useSnackNotification"

export function CompanyUserList() {
  const { api, auth } = useClientAPIService()
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const loadRef = useRef<boolean>()
  const { showNotification } = useSnackNotification()

  useEffect(() => {
    loadRef.current = true
    const getUsers = async () => {
      try {
        setLoading(true)
        const [loggedInUser, { users }] = await Promise.all([
          auth.getCurrentUser(),
          api.getUsersWithinAuthUserCompany()
        ])
        setLoggedInUser(loggedInUser)
        setUsers(users)
      } catch (e) {
        showNotification("Unable to load User record")
      } finally {
        setLoading(false)
      }
    }
    getUsers()
  }, [])
  if (loading) return <Loader />

  async function removeUserFromList(data: User) {
    try {
      if (data.id === loggedInUser?.id) {
        showNotification("You cannot remove yourself from company")
        return
      }
      await api.removeUserFromCompany(data.id)
      await api.getUsersWithinAuthUserCompany()
    } catch (e) {
      showNotification("Unable to remove user from company")
    }
  }

  const onActionItemClick = async (title: string, data: User) => {
    if (title === "Remove user from company") {
      await removeUserFromList(data)
    }
  }
  return (
    <>
      <h1>Company's Users</h1>
      <Table
        data={users}
        columns={[
          { field: "name", label: "Name" },
          { field: "email", label: "Email" }
        ]}
        actions={[{ title: "Remove user from company", icon: "trash-alt" }]}
        onActionItemClick={onActionItemClick}
      />
    </>
  )
}
