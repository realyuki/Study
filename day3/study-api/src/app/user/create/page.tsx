'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { mutate } from 'swr'
import { useRecoilState } from 'recoil'
import { nameState, emailState } from '@/store'

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
  const [name, setName] = useRecoilState(nameState)
  const [email, setEmail] = useRecoilState(emailState)
  const [formError, setFormError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setFormError(null)
    try {
      await createUser({ name, email })
      alert('생성했습니다. Users List 페이지로 이동합니다.')
      mutate('/api/user')
      router.push('/user')
    } catch (error: any) {
      setFormError(error.message)
    }
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
      {formError && <p style={{ color: 'red' }}>{formError}</p>}
    </div>
  )
}

export default CreateUserPage
