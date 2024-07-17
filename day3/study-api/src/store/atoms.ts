import { atom } from 'recoil'

interface User {
  id: string
  name: string
  email: string
}

export const userState = atom<User | null>({
  key: 'userState',
  default: null
})

export const usersState = atom<User[]>({
  key: 'usersState',
  default: []
})

export const nameState = atom<string>({
  key: 'nameState',
  default: ''
})

export const emailState = atom<string>({
  key: 'emailState',
  default: ''
})
