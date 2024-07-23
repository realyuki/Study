'use client'

import { useCreateUser } from '@/hooks/useUserQueries'
import { useUserFormStore } from '@/store/useUserFormStore'

const CreateUserPage = () => {
  const { name, email, setName, setEmail } = useUserFormStore()
  const mutation = useCreateUser()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    mutation.mutate({
      name,
      email
    })
  }

  return (
    <div className="form-container">
      <h1>Create User</h1>
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
          Create User
        </button>
      </form>
      {mutation.isError && (
        <p style={{ color: 'red' }}>{mutation.error.message}</p>
      )}
    </div>
  )
}

export default CreateUserPage
