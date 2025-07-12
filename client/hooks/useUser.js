import { useQuery } from '@tanstack/react-query'
import { fetchCurrentUser } from '../services/api/user'

export const useUser = (enabled = true) => {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchCurrentUser,
    retry: 3,
    enabled   
  })
}
