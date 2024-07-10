'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface User {
  id: string
  name: string
  email: string
}

const fetchUser = async (id: string): Promise<User> => {
  const response = await fetch(`/api/user?id=${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch user')
  }
  return response.json()
}

const updateUser = async (user: User) => {
  const response = await fetch('/api/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.message || 'Failed to update user')
  }
  return response.json()
}

const EditUserPage = () => {
  const pathname = usePathname()
  const router = useRouter()
  const id = pathname?.split('/')[2]
  const queryClient = useQueryClient()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const {
    data: user,
    isLoading,
    error: fetchError
  } = useQuery<User, Error>({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id as string),
    enabled: !!id
  })

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      alert('수정했습니다. 상세 페이지로 이동합니다.'),
        queryClient.invalidateQueries({
          queryKey: ['user', id]
        })
      router.push(`/user/${id}`)
    },
    onError: (error: Error) => {
      alert(error.message)
    }
  })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (user) {
      updateUserMutation.mutate({
        id: user.id,
        name,
        email
      })
    }
  }

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
    }
  }, [user])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (fetchError) {
    return <div>Error: {fetchError.message}</div>
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
          Update User
        </button>
      </form>
      {fetchError && <p style={{ color: 'red' }}>{fetchError}</p>}
    </div>
  )
}

export default EditUserPage
