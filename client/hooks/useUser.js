import { useQuery } from '@tanstack/react-query'
import { fetchCurrentUser } from '../services/api/user'

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchCurrentUser
  })
}
