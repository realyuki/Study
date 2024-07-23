import { create } from 'zustand'

interface UserFormState {
  name: string
  email: string
  setName: (name: string) => void
  setEmail: (email: string) => void
  reset: () => void
}

export const useUserFormStore = create<UserFormState>((set) => ({
  name: '',
  email: '',
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  reset: () => set({ name: '', email: '' })
}))
