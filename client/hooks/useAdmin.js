import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { fetchPendingItems , fetchUserList } from '../services/api/admin'

export function usePendingItems() {
  return useQuery({
    queryKey: ["admin", "pending-items"],
    queryFn: fetchPendingItems,
    retry:3
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
    queryFn: fetchUserList,
  })
}
