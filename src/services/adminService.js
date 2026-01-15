import api from '../utils/api';

const adminService = {
  // Get all users
  getUsers: async () => {
    try {
      const data = await api.get('/admin/users');
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error("GET USERS ERROR:", err);
      return [];
    }
  },

  // Update user
  updateUser: async (userId, updates) => {
    return await api.put(`/admin/users/${userId}`, updates);
  },

  // Block user
  blockUser: async (userId) => {
    return await api.put(`/admin/users/${userId}`, { blocked: true });
  },

  // Unblock user
  unblockUser: async (userId) => {
    return await api.put(`/admin/users/${userId}`, { blocked: false });
  },

  // Get all withdrawals
  getWithdrawals: async () => {
    try {
      const data = await api.get('/admin/withdrawals');
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error("GET WITHDRAWALS ERROR:", err);
      return [];
    }
  },

  // Approve withdrawal
  approveWithdrawal: async (withdrawalId) => {
    return await api.post(`/admin/withdrawals/${withdrawalId}/approve`);
  },

  // Get analytics
  getAnalytics: async () => {
    return await api.get('/admin/analytics');
  },

  // Get user details
  getUserDetails: async () => {
    try {
      const data = await api.get('/admin/user-details');
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error("GET USER DETAILS ERROR:", err);
      return [];
    }
  },

  // Get transactions
  getTransactions: async () => {
    try {
      const data = await api.get('/admin/transactions');
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error("GET TRANSACTIONS ERROR:", err);
      return [];
    }
  },

  // Get settings
  getSettings: async () => {
    try {
      const data = await api.get('/admin/settings');
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error("GET SETTINGS ERROR:", err);
      return [];
    }
  },

  // Update setting
  updateSetting: async (key, updates) => {
    return await api.put(`/admin/settings/${key}`, updates);
  },

  // Get daily report
  getDailyReport: async (date) => {
    return await api.get(`/reports/daily?date=${date}`);
  },

  // Download daily report CSV
  downloadDailyReport: async (date) => {
    const response = await api.get(`/reports/daily/export?date=${date}`, {
      responseType: 'blob'
    });

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `daily-report-${date}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }
};

export default adminService;
