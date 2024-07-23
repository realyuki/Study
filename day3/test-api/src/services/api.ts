import axiosInstance from './httpClient'

export interface User {
  id: string
  name: string
  email: string
}

export const fetchUser = async (id: string): Promise<User> => {
  try {
    const response = await axiosInstance.get(`/user/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateUser = async (user: User) => {
  try {
    const response = await axiosInstance.put(`/user/${user.id}`, user)
    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteUser = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/user/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export interface CreateUserInput {
  name: string
  email: string
}

export const createUser = async (user: CreateUserInput) => {
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
