import axios from '@/lib/axiosInstance'

export const fetchUserSwaps = async () => {
  const response = await axios.get('/user/swap/list')
  return response.data
}
