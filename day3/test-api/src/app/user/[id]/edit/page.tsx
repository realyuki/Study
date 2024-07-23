'use client'

import { useEffect } from 'react'
import { useFetchUser, useUpdateUser } from '@/hooks/useUserQueries'
import { useUserFormStore } from '@/store/useUserFormStore'

const EditUserPage = ({ params }: { params: { id: string } }) => {
  const id = params.id
  const {
    data: user,
    isLoading,
    error: fetchError
  } = useFetchUser(id as string)
  const updateUserMutation = useUpdateUser(id as string)
  const { name, email, setName, setEmail } = useUserFormStore()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (user) {
      updateUserMutation.mutate({ id: user.id, name, email })
    }
  }

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
    }
  }, [user, setName, setEmail])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (fetchError) {
    return <div>Error: {fetchError.message}</div>
  }

  return (
    <div className="form-container">
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" className="submit">
          Update User
        </button>
      </form>
      {fetchError && <p style={{ color: 'red' }}>{fetchError}</p>}
    </div>
  )
}

export default EditUserPage
