import api from './apiConfig'

export const postGroup = async (groupData) => {
  try {
    const response = await api.post('/groups/add-group', groupData);
    return response.data;
  } catch (error) {
    throw Object.values(error.response.data.errors)
  }
}