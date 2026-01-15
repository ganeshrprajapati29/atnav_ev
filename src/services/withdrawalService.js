import api from '../utils/api';

export const createWithdrawal = async (withdrawalData) => {
  return api.post('/withdrawals', withdrawalData);
};

export const getWithdrawals = async () => {
  return api.get('/withdrawals');
};

export const approveWithdrawal = async (id) => {
  return api.put(`/withdrawals/${id}/approve`);
};
