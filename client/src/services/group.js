import api from './apiConfig'

export const postGroup = async (groupData) => {
  try {
    const response = await api.post('/groups/add-group', groupData);
    return response.data;
  } catch (error) {
    // throw Object.values(error.response.data.errors)
    throw error
  }
}

export const getGroup = async (id) => {
  try {
    const response = await api.get(`/groups/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getGroups = async (groupData) => {
  try {
    const response = await api.post(`/groups`, groupData)
    return response.data
  } catch (error) {
    throw error
  }
}