import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface User {
  id: string
  name: string
  email: string
}

interface UserState {
  user: User | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null
}

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id: string) => {
    const response = await fetch(`/api/user?id=${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.message || 'Failed to delete user')
    }
    return response.json()
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = null
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to delete user'
      })
  }
})

export const userReducer = userSlice.reducer
