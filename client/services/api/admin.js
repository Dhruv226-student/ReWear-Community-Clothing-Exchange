import axios from '@/lib/axiosInstance'

export const fetchPendingItems = async () => {
  const response = await axios.get('/admin/item/list')
  return response.data
}

export const fetchUserList = async () => {
  const response = await axios.get('/admin/user/list')
  return response.data
}
