import api from "./apiConfig";

export const postGroup = async (groupData) => {
  try {
    const response = await api.post("/groups/add-group", groupData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGroup = async (id) => {
  try {
    const response = await api.get(`/groups/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGroups = async (groupData) => {
  try {
    const response = await api.post(`/groups`, groupData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const requestGroup = async (id) => {
  try {
    const response = await api.put(`/groups/edit-group/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const adminResponse = async (id, data) => {
  try {
    const response = await api.put(`/groups/edit-requests/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editGroupSettings = async (id, data) => {
  try {
    const response = await api.put(`/groups/edit-group-settings/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
