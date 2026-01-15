import api from '../utils/api';

export const getLeaderboard = async () => {
  return api.get('/users/leaderboard');
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
