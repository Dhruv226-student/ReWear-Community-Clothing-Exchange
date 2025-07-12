import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { fetchUserSwaps } from '../services/api/user'

export function useUserSwaps() {
  return useQuery({
    queryKey: ["swaps"],
    queryFn: () => fetchUserSwaps,
  })
}

export function useCreateSwapRequest() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: api.createSwapRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["swaps"] })
    },
  })
}
