'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { fetchUser } from '@/store/userFormSlice'
import { deleteUser } from '@/store/uesrSlice'

const UserPage = () => {
  const pathname = usePathname()
  const router = useRouter()
  const id = pathname?.split('/')[2]
  const dispatch = useDispatch<AppDispatch>()

  const { user, status, error } = useSelector(
    (state: RootState) => state.userForm
  )

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id))
    }
  }, [])

  const handleDelete = () => {
    dispatch(deleteUser(id as string))
      .unwrap()
      .then(() => {
        alert('삭제했습니다. 목록 페이지로 이동합니다.')
        router.push('/user')
      })
      .catch((error) => {
        alert(error.message || 'Failed to delete user')
      })
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>
  }

  return (
    <div className="user-detail">
      <h1>User Detail</h1>
      <p>
        <strong>ID:</strong> {user?.id}
      </p>
      <p>
        <strong>Name:</strong> {user?.name}
      </p>
      <div className="actions">
        <button
          onClick={handleDelete}
          disabled={status === 'idle'}
          className="btn-delete"
        >
          Delete User
        </button>
        <Link href="/user" className={'link'}>
          Back to User List
        </Link>
      </div>
    </div>
  )
}

export default UserPage
