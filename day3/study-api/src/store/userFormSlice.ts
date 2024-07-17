import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

interface User {
  id: string
  name: string
  email: string
}

interface UserFormState {
  user: User | null
  name: string
  email: string
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: UserFormState = {
  user: null,
  name: '',
  email: '',
  status: 'idle',
  error: null
}

export const fetchUser = createAsyncThunk(
  'userForm/fetchUser',
  async (id: string) => {
    const response = await fetch(`/api/user?id=${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch user')
    }
    return response.json()
  }
)

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('/api/user')
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }
  return response.json() as Promise<User[]>
})

export const createUser = createAsyncThunk(
  'userForm/createUser',
  async (user: { name: string; email: string }) => {
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
    return response.json() as Promise<User>
  }
)

export const updateUser = createAsyncThunk(
  'userForm/updateUser',
  async (user: User) => {
    const response = await fetch('/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.message || 'Failed to updsate user')
    }
    return response.json()
  }
)

const userFormSlice = createSlice({
  name: 'userForm',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload
    },
    resetForm(state) {
      state.name = ''
      state.email = ''
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded'
        state.user = action.payload
        state.name = action.payload.name
        state.email = action.payload.email
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch user'
      })
      .addCase(createUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded'
        state.user = action.payload
        state.name = action.payload.name
        state.email = action.payload.email
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to create user'
      })
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded'
        state.user = action.payload
        state.name = action.payload.name
        state.email = action.payload.email
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to update user'
      })
  }
})

export const { setName, setEmail, resetForm } = userFormSlice.actions

export const userFormReducer = userFormSlice.reducer
