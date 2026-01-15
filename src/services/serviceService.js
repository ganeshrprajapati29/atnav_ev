import api from '../utils/api';

export const getServices = async () => {
  return api.get('/services');
};

export const redeemService = async (serviceId) => {
  return api.post(`/services/${serviceId}/redeem`);
};

export const createService = async (serviceData) => {
  return api.post('/services', serviceData);
};

export const updateService = async (id, serviceData) => {
  return api.put(`/services/${id}`, serviceData);
};

export const deleteService = async (id) => {
  return api.delete(`/services/${id}`);
};
