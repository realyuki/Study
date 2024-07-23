'use client'

import Link from 'next/link'
import { useFetchUser, useDeleteUser } from '@/hooks/useUserQueries'

const UserPage = ({ params }: { params: { id: string } }) => {
  const id = params.id
  const { data: user, isLoading, error } = useFetchUser(id as string)
  const deleteUserMutation = useDeleteUser(id as string)

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
