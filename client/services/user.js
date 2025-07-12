import axios from '@/lib/axiosInstance'

export const fetchCurrentUser = async () => {
  const response = await axios.get('/user/me')
  return response.data
}
