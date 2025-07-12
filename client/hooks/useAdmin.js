import { useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { fetchPendingItems , fetchUserList ,updateItemsStatus } from '../services/api/admin'

export function usePendingItems() {
  return useQuery({
    queryKey: ["admin", "pending-items"],
    queryFn: fetchPendingItems,
    retry:3
  })
}



export function useUsers() {
  return useQuery({
    queryKey: ["admin", "users"],
    queryFn: fetchUserList,
  })
}


export function useUpdateItemStatus() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: ({ itemId, status }) => updateItemsStatus({ itemId, status }),
    onSuccess: () => {
      toast({
        title: "Status Updated",
        description: "The item status was successfully updated.",
      })
      queryClient.invalidateQueries(["admin", "pending-items"])
    },
    onError: () => {
      toast({
        title: "Update Failed",
        description: "Could not update item status.",
        variant: "destructive",
      })
    },
  })
}