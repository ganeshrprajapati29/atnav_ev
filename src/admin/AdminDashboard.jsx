import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import adminService from "../services/adminService";
import {
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  Activity,
  Shield,
  Settings,
  BarChart3,
  AlertCircle,
  CheckCircle,
  Clock,
  Loader2
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Get admin dashboard stats
      const dashboardStats = await adminService.getAdminDashboardStats();
      setStats(dashboardStats);

      // Get recent activity
      const activity = await adminService.getRecentActivity();
      setRecentActivity(activity);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's an overview of your system.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border-l-4 border-blue-500 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Users</p>
              <p className="text-3xl font-bold text-blue-600">{stats.totalUsers || 0}</p>
            </div>
            <Users size={32} className="text-blue-500" />
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp size={16} className="text-green-500 mr-1" />
            <span className="text-green-600">+{stats.newUsersToday || 0} today</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border-l-4 border-green-500 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Transactions</p>
              <p className="text-3xl font-bold text-green-600">{stats.totalTransactions || 0}</p>
            </div>
            <Activity size={32} className="text-green-500" />
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp size={16} className="text-green-500 mr-1" />
            <span className="text-green-600">+{stats.transactionsToday || 0} today</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border-l-4 border-yellow-500 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Coins</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.totalCoins || 0}</p>
            </div>
            <DollarSign size={32} className="text-yellow-500" />
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp size={16} className="text-green-500 mr-1" />
            <span className="text-green-600">Active circulation</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border-l-4 border-purple-500 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">KYC Applications</p>
              <p className="text-3xl font-bold text-purple-600">{stats.totalKYC || 0}</p>
            </div>
            <FileText size={32} className="text-purple-500" />
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Clock size={16} className="text-orange-500 mr-1" />
            <span className="text-orange-600">{stats.pendingKYC || 0} pending</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/admin/users')}
            className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <Users size={24} className="text-blue-600 mb-2" />
            <span className="text-sm font-medium text-blue-800">Manage Users</span>
          </button>

          <button
            onClick={() => navigate('/admin/kyc')}
            className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
          >
            <Shield size={24} className="text-purple-600 mb-2" />
            <span className="text-sm font-medium text-purple-800">KYC Review</span>
          </button>

          <button
            onClick={() => navigate('/admin/transactions')}
            className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
          >
            <Activity size={24} className="text-green-600 mb-2" />
            <span className="text-sm font-medium text-green-800">Transactions</span>
          </button>

          <button
            onClick={() => navigate('/admin/analytics')}
            className="flex flex-col items-center p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
          >
            <BarChart3 size={24} className="text-orange-600 mb-2" />
            <span className="text-sm font-medium text-orange-800">Analytics</span>
          </button>

          {/* <button
            onClick={() => navigate('/admin/withdrawals')}
            className="flex flex-col items-center p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
          >
            <DollarSign size={24} className="text-red-600 mb-2" />
            <span className="text-sm font-medium text-red-800">Withdrawals</span>
          </button> */}

          <button
            onClick={() => navigate('/admin/settings')}
            className="flex flex-col items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Settings size={24} className="text-gray-600 mb-2" />
            <span className="text-sm font-medium text-gray-800">Settings</span>
          </button>

          <button
            onClick={() => navigate('/admin/logs')}
            className="flex flex-col items-center p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
          >
            <FileText size={24} className="text-indigo-600 mb-2" />
            <span className="text-sm font-medium text-indigo-800">System Logs</span>
          </button>

          <button
            onClick={() => navigate('/admin/reports')}
            className="flex flex-col items-center p-4 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors"
          >
            <TrendingUp size={24} className="text-teal-600 mb-2" />
            <span className="text-sm font-medium text-teal-800">Reports</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.length > 0 ? (
            recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Activity size={16} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{activity.timeAgo}</span>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Activity size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No recent activity</p>
            </div>
          )}
        </div>
      </div>

      {/* System Status */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle size={24} className="text-green-600" />
            <h3 className="text-lg font-semibold text-gray-800">System Status</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">API Status</span>
              <span className="text-sm font-medium text-green-600">Online</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Database</span>
              <span className="text-sm font-medium text-green-600">Connected</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Payments</span>
              <span className="text-sm font-medium text-green-600">Active</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle size={24} className="text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-800">Pending Tasks</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">KYC Reviews</span>
              <span className="text-sm font-medium text-orange-600">{stats.pendingKYC || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Withdrawals</span>
              <span className="text-sm font-medium text-orange-600">{stats.pendingWithdrawals || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Support Tickets</span>
              <span className="text-sm font-medium text-orange-600">{stats.pendingTickets || 0}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp size={24} className="text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">Today's Summary</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">New Users</span>
              <span className="text-sm font-medium text-blue-600">{stats.newUsersToday || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Transactions</span>
              <span className="text-sm font-medium text-blue-600">{stats.transactionsToday || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Revenue</span>
              <span className="text-sm font-medium text-blue-600">₹{stats.revenueToday || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
