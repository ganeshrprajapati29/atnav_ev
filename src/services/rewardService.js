import api from '../utils/api';

export const getRewards = async () => {
  return api.get('/rewards');
};

export const getRewardStats = async () => {
  return api.get('/rewards/stats');
};
