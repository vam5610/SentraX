import api from "@/utils/api"

export async function apiRequest(path, options = {}) {
  const response = await api({
    url: path,
    ...options,
  })
  return response.data
}

export default api
