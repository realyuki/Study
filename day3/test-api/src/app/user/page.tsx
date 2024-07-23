'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/services/httpClient'

interface User {
  id: string
  name: string
  email: string
}

const fetchUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get('/user')
  if (response.status !== 200) {
    throw new Error('Failed to fetch users')
  }
  return response.data
}

const UsersPage = () => {
  const {
    data: users,
    isLoading,
    error
  } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
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
