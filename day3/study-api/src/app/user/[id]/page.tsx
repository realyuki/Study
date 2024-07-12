'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import useSWR, { mutate } from 'swr'
import { useRecoilState } from 'recoil'
import { userState } from '@/store'
import { useEffect } from 'react'

interface User {
  id: string
  name: string
  email: string
}

const fetchUser = async (id: string): Promise<User> => {
  const response = await fetch(`/api/user/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch user')
  }
  return response.json()
}

const deleteUser = async (id: string) => {
  const response = await fetch(`/api/user?id=${id}`, {
    method: 'DELETE'
  })
  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.message || 'Failed to delete user')
  }
  return response.json()
}

const UserPage = () => {
  const pathname = usePathname()
  const router = useRouter()
  const id = pathname?.split('/')[2]
  const [user, setUser] = useRecoilState(userState)

  const { data, error } = useSWR<User, Error>(id, fetchUser, {
    onSuccess: (data) => setUser(data)
  })

  useEffect(() => {
    if (data) {
      setUser(data)
    }
  }, [data])

  const handleDelete = async () => {
    try {
      await deleteUser(id as string)
      alert('삭제했습니다. 목록 페이지로 이동합니다.')
      mutate(`/api/user/${id}`)
      router.push('/user')
    } catch (error: any) {
      alert(error.message || 'Failed to delete user')
    }
  }

  if (!data && !error) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
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
          disabled={!data && !error}
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
