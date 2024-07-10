'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

interface CreateUserInput {
  name: string
  email: string
}

const createUser = async (user: CreateUserInput) => {
  const response = await fetch('/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.message || 'Failed to create user')
  }
  return response.json()
}

const CreateUserPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      alert('생성했습니다. Users List 페이지로 이동합니다.')
      router.push('/user')
    },
    onError: (error: Error) => {
      alert(error.message)
    }
  })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    mutation.mutate({
      name,
      email
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
          Create User
        </button>
      </form>
      {mutation.isError && (
        <p style={{ color: 'red' }}>{mutation.error.message}</p>
      )}
    </div>
  )
}

export default CreateUserPage
