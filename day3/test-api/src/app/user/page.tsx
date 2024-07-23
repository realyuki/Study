'use client'

import Link from 'next/link'
import { useCreateUser, useFetchUsers } from '@/hooks/useUserQueries'
import { useUserFormStore } from '@/store/useUserFormStore'

const UserManagementPage = () => {
  const { name, email, setName, setEmail } = useUserFormStore()
  const createUserMutation = useCreateUser()
  const { data: users, isLoading, error } = useFetchUsers()

  const handleCreateUserSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    createUserMutation.mutate({ name, email })
  }

  return (
    <div className="user-management-container">
      <div className="form-container">
        <h1>Create User</h1>
        <form onSubmit={handleCreateUserSubmit} className="user-form">
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
            Create User
          </button>
        </form>
        {createUserMutation.isError && (
          <p style={{ color: 'red' }}>{createUserMutation.error.message}</p>
        )}
      </div>

      <div className="users-container">
        <h1>Users List</h1>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <ul className="user-list">
            {users?.map((user) => (
              <li key={user.id}>
                <span className="user-name">{user.name}</span>
                <Link href={`/user/${user.id}`}>상세</Link>
                <Link href={`/user/${user.id}/edit`}>수정</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default UserManagementPage
