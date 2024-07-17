import { configureStore } from '@reduxjs/toolkit'
import { userFormReducer } from './userFormSlice'
import { userReducer } from './uesrSlice'
import { usersReducer } from './usersSlice'

export const store = configureStore({
  reducer: {
    userForm: userFormReducer,
    user: userReducer,
    users: usersReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
