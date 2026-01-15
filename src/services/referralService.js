import api from '../utils/api';

const generateReferralCode = async () => {
  const response = await api.post('/referrals/generate-code');
  return response.data;
};

const getReferralStats = async () => {
  const response = await api.get('/referrals/stats');
  return response.data;
};

const getAllReferrals = async (page = 1, limit = 10) => {
  const response = await api.get(`/referrals/all?page=${page}&limit=${limit}`);
  return response.data;
};

export { generateReferralCode, getReferralStats, getAllReferrals };
