import { useClientAPIService } from "../../hooks/useClientAPIService"
import React, { useEffect, useRef, useState } from "react"
import { User } from "../../services/types"
import { Loader } from "../../components/Loader"
import { ProfileForm } from "../../components/forms/ProfileForm"

export function ProfileContainer() {
  const { auth, api } = useClientAPIService()
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const loadRef = useRef<boolean>()

  useEffect(() => {
    loadRef.current = true
    const getUser = async () => {
      try {
        setLoading(true)
        const loggedInUser = await auth.getCurrentUser()
        if (loadRef.current) setLoggedInUser(loggedInUser)
      } catch (e) {
        //TODO: Show error notification
      } finally {
        if (loadRef.current) setLoading(false)
      }
    }
    getUser()
    return () => {
      loadRef.current = false
    }
  }, [])

  if (loading) return <Loader />

  if (!loggedInUser) return <div />

  const onSubmit = async (user: User) => {
    try {
      await api.updateUser(user)
    } catch (e) {
      //TODO: Show notification
    }
  }

  return (
    <div>
      <h1>Profile</h1>
      <br />
      <ProfileForm user={loggedInUser} onSubmit={onSubmit} />
    </div>
  )
}
