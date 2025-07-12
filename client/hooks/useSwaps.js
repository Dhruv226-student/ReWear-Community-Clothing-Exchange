import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"

export function useUserSwaps(userId) {
  return useQuery({
    queryKey: ["swaps", "user", userId],
    queryFn: () => api.getUserSwaps(userId),
    enabled: !!userId,
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
