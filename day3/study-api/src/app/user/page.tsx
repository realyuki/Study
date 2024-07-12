'use client'

import Link from 'next/link'
import useSWR from 'swr'
import { useRecoilState } from 'recoil'
import { usersState } from '@/store'

interface User {
  id: string
  name: string
  email: string
}

const fetchUsers = async (id: string): Promise<User[]> => {
  const response = await fetch('/api/user')
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }
  return response.json()
}

const UsersPage = () => {
  const [users, setUsers] = useRecoilState(usersState)

  const { data, error } = useSWR(`/api/user`, fetchUsers, {
    onSuccess: (data) => setUsers(data)
  })

  if (!data && !error) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h1>Users List</h1>
      <ul className="file-list">
        {users?.map((user) => {
          return (
            <li key={user.id}>
              <span className="user-name">{user.name}</span>
              <Link href={`/user/${user.id}`}>상세</Link>
              <Link href={`/user/${user.id}/edit`}>수정</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default UsersPage
