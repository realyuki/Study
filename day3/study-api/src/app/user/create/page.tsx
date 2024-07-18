'use client'

import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/store'
import { createUser, setName, setEmail, resetForm } from '@/store/userFormSlice'

const CreateUserPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const { name, email, status, error } = useSelector(
    (state: RootState) => state.userForm
  )

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    dispatch(
      createUser({
        name,
        email
      })
    )
      .unwrap()
      .then(() => {
        alert('생성했습니다. Users List 페이지로 이동합니다.')
        dispatch(resetForm())
        router.push('/user')
      })
      .catch((error) => {
        alert(error.message || 'Failed to create user')
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
              onChange={(e) => dispatch(setName(e.target.value))}
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
              onChange={(e) => dispatch(setEmail(e.target.value))}
              required
            />
          </label>
        </div>
        <button type="submit" className="submit">
          Create User
        </button>
      </form>
      {status === 'failed' && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default CreateUserPage
