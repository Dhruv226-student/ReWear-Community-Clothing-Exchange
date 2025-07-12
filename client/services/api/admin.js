import axios from '@/lib/axiosInstance'

export const fetchPendingItems = async () => {
  const response = await axios.get('/admin/item/list')
  return response.data
}

export const fetchUserList = async () => {
  const response = await axios.get('/admin/user/list')
  return response.data
}

// PUT: Update Item Status (Approve/Reject)
export const updateItemsStatus = async ({ itemId, status }) => {
  const response = await axios.put(`/admin/item/manage-status/${itemId}`, {
    status: status, // e.g., "Approved" or "Rejected"
  })
  return response.data
}