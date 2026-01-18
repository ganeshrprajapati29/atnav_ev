import api from '../utils/api';

export const register = async (userData) => {
  return api.post('/auth/register', userData, {
    headers: {
      'Content-Type': undefined
    }
  });
};

export const login = async (email, password) => {
  return api.post('/auth/login', { email, password });
};

export const getProfile = async () => {
  return api.get('/auth/profile');
};

export const forgotPassword = async (email) => {
  return api.post('/auth/forgot-password', { email });
};

export const resetPassword = async (token, password) => {
  return api.post('/auth/reset-password', { token, password });
};

export const createPaymentOrder = async (amount) => {
  return api.post('/auth/create-payment-order', { amount });
};

export const verifyPayment = async (paymentData) => {
  return api.post('/auth/verify-payment', paymentData);
};
