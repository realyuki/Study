import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface User {
  id: string
  name: string
  email: string
}

interface UsersState {
  users: User[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
  error: null
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('/api/user')
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }
  return response.json() as Promise<User[]>
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {}
})

export const usersReducer = usersSlice.reducer
