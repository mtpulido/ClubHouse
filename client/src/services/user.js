import api from './apiConfig'

export const getUser = async (id) => {
  try {
    const response = await api.get(`/users/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const postRound = async (roundData) => {
  try {
    const response = await api.put('/users/add-round', roundData);
    return response.data;
  } catch (error) {
    throw Object.values(error.response.data.errors)
  }
}