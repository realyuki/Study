export interface User {
  id: string
  name: string
  email: string
}

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch('/api/user')
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }
  return response.json()
}

export const fetchUser = async (id: string): Promise<User> => {
  const response = await fetch(`/api/user?id=${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch user')
  }
  return response.json()
}

export const createUser = async (user: string): Promise<User> => {
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

export const updateUser = async (user: User): Promise<User> => {
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

export const deleteUser = async (id: string): Promise<void> => {
  const response = await fetch(`/api/user?id=${id}`, {
    method: 'DELETE'
  })
  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.message || 'Failed to delete user')
  }
  return response.json()
}
