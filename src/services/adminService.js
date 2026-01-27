import api from '../utils/api';

const adminService = {
  // Get all users with pagination
  getUsers: async (page = 1, limit = 12) => {
    try {
      const response = await api.get(`/admin/users?page=${page}&limit=${limit}`);
      return response || { users: [], pagination: {} };
    } catch (err) {
      console.error("GET USERS ERROR:", err);
      return { users: [], pagination: {} };
    }
  },

  // Create new user
  createUser: async (userData) => {
    return await api.post('/admin/users', userData);
  },

  // Send coin certificate to user
  sendCoinCertificate: async (userId) => {
    return await api.post(`/admin/users/${userId}/send-certificate`);
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

  // Delete user
  deleteUser: async (userId) => {
    return await api.delete(`/admin/users/${userId}`);
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
  },

  // Get activity logs
  getActivityLogs: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const data = await api.get(`/admin/activity-logs${queryString ? `?${queryString}` : ''}`);
      return data || { logs: [], pagination: {}, filters: {} };
    } catch (err) {
      console.error("GET ACTIVITY LOGS ERROR:", err);
      return { logs: [], pagination: {}, filters: {} };
    }
  },

  // Get admin dashboard stats
  getAdminDashboardStats: async () => {
    try {
      const data = await api.get('/admin/dashboard-stats');
      return data || {};
    } catch (err) {
      console.error("GET ADMIN DASHBOARD STATS ERROR:", err);
      return {};
    }
  },

  // Get recent activity
  getRecentActivity: async () => {
    try {
      const data = await api.get('/admin/recent-activity');
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error("GET RECENT ACTIVITY ERROR:", err);
      return [];
    }
  }
};

export default adminService;
