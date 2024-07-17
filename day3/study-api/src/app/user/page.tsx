'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/store'
import { fetchUsers } from '@/store/userFormSlice'

const UsersPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { users, status, error } = useSelector(
    (state: RootState) => state.users
  )

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h1>Users List</h1>
      <ul className="file-list">
        {users?.map((user) => (
          <li key={user.id}>
            <span className="user-name">{user.name}</span>
            <Link href={`/user/${user.id}`}>상세</Link>
            <Link href={`/user/${user.id}/edit`}>수정</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UsersPage
