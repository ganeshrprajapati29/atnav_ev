import api from '../utils/api';

const getHomeContent = async () => {
  const response = await api.get('/home-content');
  return response.data;
};

const updateHomeContent = async (data) => {
  const response = await api.put('/home-content', data);
  return response;
};

const updateSection = async (id, data) => {
  const response = await api.put(`/home-content/section/${id}`, data);
  return response.data;
};

export default {
  getHomeContent,
  updateHomeContent,
  updateSection
};
