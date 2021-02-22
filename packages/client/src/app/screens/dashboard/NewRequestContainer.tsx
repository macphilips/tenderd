import { RequestForm } from "../../components/forms/RequestForm"
import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { useClientAPIService } from "../../hooks/useClientAPIService"
import { Company, Request, User } from "../../services/types"
import { Loader } from "../../components/Loader"

// TODO delete after testing
export function NewRequestContainer() {
  const { api, auth } = useClientAPIService()
  const history = useHistory()
  const [users, setUsers] = useState<User[]>([])
  const [company, setCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true)
        const [{ users }, authUserCompany] = await Promise.all([
          api.getUsersWithinAuthUserCompany(),
          auth.getAuthUserCompany()
        ])
        setUsers(users)
        setCompany(authUserCompany)
      } catch (e) {
        //TODO: Show error notification
      } finally {
        setLoading(false)
      }
    }
    getUsers()
  }, [])

  const onSubmit = async (request: Request) => {
    try {
      await api.createRequest(request)
      history.push("/dashboard")
    } catch (e) {
      setLoading(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div className="container">
      <RequestForm mode="Edit" onSubmit={onSubmit} />
    </div>
  )
}
