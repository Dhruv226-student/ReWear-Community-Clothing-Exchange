// hooks/useItems.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOrUpdateItem,
  fetchItems,
  fetchItemById,
  fetchItemDetails,
  deleteItem,
  fetchUserItems,
} from "@/services/api/items";
import { api } from "@/lib/api";

// Query keys
export const ITEMS_QUERY_KEYS = {
  items: ["items"],
  item: (id) => ["items", id],
  itemDetails: (id) => ["items", "details", id],
  userItems: (userId) => ["items", "user", userId],
};

// Create or Update Item Hook
export const useCreateOrUpdateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrUpdateItem,
    onSuccess: (data) => {
      // Invalidate and refetch items queries
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEYS.items });

      // If it's an update, invalidate the specific item query
      if (data.data?._id) {
        queryClient.invalidateQueries({
          queryKey: ITEMS_QUERY_KEYS.item(data.data._id),
        });
        queryClient.invalidateQueries({
          queryKey: ITEMS_QUERY_KEYS.itemDetails(data.data._id),
        });
      }

      // Invalidate user items if we have owner info
      if (data.data?.owner) {
        queryClient.invalidateQueries({
          queryKey: ITEMS_QUERY_KEYS.userItems(data.data.owner),
        });
      }
    },
    onError: (error) => {
      console.error("Error creating/updating item:", error);
    },
  });
};

// Get Items Hook
export const useItems = (params = {}) => {
  return useQuery({
    queryKey: [...ITEMS_QUERY_KEYS.items, params],
    queryFn: () => fetchItems(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get Single Item Hook
export const useItem = (itemId) => {
  return useQuery({
    queryKey: ITEMS_QUERY_KEYS.item(itemId),
    queryFn: () => fetchItemById(itemId),
    enabled: !!itemId,
    staleTime: 5 * 60 * 1000,
  });
};

// Get Item Details Hook (for editing)
export const useItemDetails = (itemId) => {
  return useQuery({
    queryKey: ITEMS_QUERY_KEYS.itemDetails(itemId),
    queryFn: () => fetchItemDetails(itemId),
    enabled: !!itemId,
    staleTime: 5 * 60 * 1000,
  });
};

// Delete Item Hook
export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEYS.items });
    },
    onError: (error) => {
      console.error("Error deleting item:", error);
    },
  });
};

// Get User Items Hook
export const useUserItems = (userId) => {
  return useQuery({
    queryKey: ITEMS_QUERY_KEYS.userItems(userId),
    queryFn: () => fetchUserItems(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

export function useFeaturedItems() {
  return useQuery({
    queryKey: ["items", "featured"],
    queryFn: ({ limit }) => api.getFeaturedItems(limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    onError: (error) => {
      console.error("Error fetching featured items:", error);
    },
  });
}
