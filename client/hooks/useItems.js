import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { fetchItemsList } from '../services/api/items'

export function useItems(filters = {}) {
  return useQuery({
    queryKey: ["items", filters],
    queryFn: fetchItemsList,
  })
}

export function useFeaturedItems() {
  return useQuery({
    queryKey: ["items", "featured"],
    queryFn: api.getFeaturedItems,
  })
}

export function useItem(id) {
  return useQuery({
    queryKey: ["items", id],
    queryFn: () => api.getItemById(id),
    enabled: !!id,
  })
}

export function useUserItems(userId) {
  return useQuery({
    queryKey: ["items", "user", userId],
    queryFn: () => api.getUserItems(userId),
    enabled: !!userId,
  })
}

export function useCreateItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: api.createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] })
    },
  })
}
