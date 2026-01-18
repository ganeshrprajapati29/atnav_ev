import api from '../utils/api';

/**
 * ===============================
 * Generate referral code
 * ===============================
 */
const generateReferralCode = async () => {
  return api.post('/referrals/generate-code');
};

/**
 * ===============================
 * Get referral stats
 * ===============================
 */
const getReferralStats = async () => {
  return api.get('/referrals/stats');
};

/**
 * ===============================
 * Admin: get all referrals
 * ===============================
 */
const getAllReferrals = async (page = 1, limit = 10) => {
  return api.get(
    `/referrals/all?page=${page}&limit=${limit}`
  );
};

export {
  generateReferralCode,
  getReferralStats,
  getAllReferrals
};
