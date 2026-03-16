import axios from 'axios'

const rapidApiKey = import.meta.env.VITE_RAPID_API_KEY || import.meta.env.REACT_APP_RAPID_API_KEY

const apiClient = axios.create({
  baseURL: 'https://youtube-v31.p.rapidapi.com',
  headers: {
    'x-rapidapi-key': rapidApiKey,
    'x-rapidapi-host': 'youtube-v31.p.rapidapi.com',
  },
})

export const fetchFromAPI = async (url, params = {}) => {
  if (!rapidApiKey) {
    throw new Error('Missing RapidAPI key. Add VITE_RAPID_API_KEY to .env and restart the Vite dev server.')
  }

  try {
    const response = await apiClient.get(url, {
      params: {
        maxResults: 24,
        ...params,
      },
    })

    return response.data
  } catch (error) {
    const apiMessage = error.response?.data?.message || error.message

    throw new Error(apiMessage || 'Unable to fetch data from RapidAPI.')
  }
}
