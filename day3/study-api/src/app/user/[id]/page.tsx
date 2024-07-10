'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'

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
  const queryClient = useQueryClient()
  const {
    data: user,
    isLoading,
    error
  } = useQuery<User, Error>({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id as string),
    enabled: !!id
  })

  const deleteUserMutation = useMutation({
    mutationFn: () => deleteUser(id as string),
    onSuccess: () => {
      alert('삭제했습니다. 목록 페이지로 이동합니다.')
      queryClient.invalidateQueries({
        queryKey: ['user', id]
      })
      router.push('/user')
    },
    onError: (error: any) => {
      alert(error.message || 'Failed to delete user')
    }
  })

  const handleDelete = () => {
    deleteUserMutation.mutate()
  }

  if (isLoading) {
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
          disabled={isLoading}
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
