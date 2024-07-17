'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@/store'
import { fetchUser, updateUser, setName, setEmail } from '@/store/userFormSlice'

const EditUserPage = () => {
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const id = pathname?.split('/')[2]

  const { name, email, status, error } = useSelector(
    (state: RootState) => state.userForm
  )

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id))
    }
  }, [])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    dispatch(
      updateUser({
        id: id as string,
        name,
        email
      })
    )
      .unwrap()
      .then(() => {
        alert('수정했습니다. 상세 페이지로 이동합니다.')
        router.push(`/user/${id}`)
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>
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
          Update User
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default EditUserPage
