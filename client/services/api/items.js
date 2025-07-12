import axios from '@/lib/axiosInstance'

export const fetchItemsList = async () => {
  const response = await axios.get('/items')
  return response.data
}
