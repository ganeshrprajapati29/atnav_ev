import api from '../utils/api';

export const getLeaderboard = async () => {
  return api.get('/users/leaderboard');
};

export const updateProfile = async (profileData) => {
  return api.put('/users/profile', profileData);
};

export const updateBankDetails = async (bankData) => {
  return api.put('/users/bank-details', bankData);
};

export const getRewardHistory = async () => {
  return api.get('/users/rewards');
};

export const getDashboard = async () => {
  return api.get('/users/dashboard');
};

export const transferCoins = async (recipientId, amount) => {
  return api.post('/users/transfer-coins', { recipientId, amount });
};

export const getUserByUniqueId = async (uniqueId) => {
  return api.get(`/users/by-unique-id/${uniqueId}`);
};

export const searchUser = async (query) => {
  return api.get('/users/search', { params: { query } });
};

export const payToUser = async (recipientId, amount, note) => {
  return api.post('/users/pay-to-user', { recipientId, amount, note });
};

export const getTransactionHistory = async () => {
  return api.get('/users/transactions');
};
