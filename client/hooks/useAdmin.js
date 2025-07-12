import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"

export function usePendingItems() {
  return useQuery({
    queryKey: ["admin", "pending-items"],
    queryFn: api.getPendingItems,
  })
}

export function useReportedItems() {
  return useQuery({
    queryKey: ["admin", "reported-items"],
    queryFn: api.getReportedItems,
  })
}

export function useUsers() {
  return useQuery({
    queryKey: ["admin", "users"],
    queryFn: api.getUsers,
  })
}
