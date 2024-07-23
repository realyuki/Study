import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  fetchUsers,
  fetchUser,
  createUser,
  updateUser,
  deleteUser,
  User
} from '@/services/api'

export const useUsers = (id: string) => {
  const queryClient = useQueryClient()

  const usersQuery = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers
  })

  const userQuery = useQuery<User, Error>({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
    enabled: !!id
  })

  const createUserMutation = useMutation({
    mutationFn: () => createUser(id),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['user', id]
      })
  })

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user', id]
      })
    }
  })

  const deleteUserMutation = useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user', id]
      })
    }
  })

  return {
    usersQuery,
    userQuery,
    createUserMutation,
    updateUserMutation,
    deleteUserMutation
  }
}
