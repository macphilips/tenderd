import { Table } from "../../components/Table"
import React, { useEffect, useRef, useState } from "react"
import { useClientAPIService } from "../../hooks/useClientAPIService"
import { User } from "../../services/types"
import { Loader } from "../../components/Loader"

export function CompanyUserList() {
  const { api, auth } = useClientAPIService()
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const loadRef = useRef<boolean>()

  useEffect(() => {
    loadRef.current = true
    const getUsers = async () => {
      try {
        setLoading(true)
        const [loggedInUser, { users }] = await Promise.all([
          auth.getCurrentUser(),
          api.getUsers()
        ])
        setLoggedInUser(loggedInUser)
        setUsers(users)
      } catch (e) {
        //TODO: Show error notification
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
        // TODO: show notification
        return
      }
      await api.removeUserFromCompany(data.id)
      await api.getUsers()
    } catch (e) {
      // TODO: show error
    }
  }

  const onActionItemClick = async (title: string, data: User) => {
    if (title === "Delete") {
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
        actions={[{ title: "Delete", icon: "trash-alt" }]}
        onActionItemClick={onActionItemClick}
      />
    </>
  )
}
