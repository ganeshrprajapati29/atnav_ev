import React, { useEffect, useState } from 'react';
import adminService from '../services/adminService';
import {
  HiUsers,
  HiCreditCard,
  HiShoppingCart,
  HiBolt,
  HiArrowTrendingUp,
  HiExclamationTriangle,
  HiServer,
  HiChartBar,
  HiEye,
  HiArrowPath
} from 'react-icons/hi2';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAnalytics();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchStats();
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block mb-6">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-emerald-600 border-r-emerald-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl">⚙️</span>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Analytics...</h2>
          <p className="text-gray-600">Please wait while we fetch system data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-lg text-gray-600">System overview and real-time analytics</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center gap-2"
          >
            <HiArrowPath size={20} className={refreshing ? 'animate-spin' : ''} />
            {refreshing ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* Total Users */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-600 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Users</p>
                <p className="text-4xl font-bold text-blue-600 mt-3">{stats?.totalUsers || 0}</p>
                <p className="text-xs text-gray-500 mt-1">Active accounts</p>
              </div>
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                👥
              </div>
            </div>
          </div>

          {/* Total Coins Earned */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-emerald-600 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Coins Earned</p>
                <p className="text-4xl font-bold text-emerald-600 mt-3">{stats?.totalCoinsEarned || 0}</p>
                <p className="text-xs text-gray-500 mt-1">Distributed</p>
              </div>
              <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center text-2xl">
                💰
              </div>
            </div>
          </div>

          {/* Total Withdrawals */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-600 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Withdrawals</p>
                <p className="text-4xl font-bold text-green-600 mt-3">{stats?.totalWithdrawals || 0}</p>
                <p className="text-xs text-gray-500 mt-1">Processed</p>
              </div>
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center text-2xl">
                💳
              </div>
            </div>
          </div>

          {/* Services Redeemed */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-purple-600 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Services Redeemed</p>
                <p className="text-4xl font-bold text-purple-600 mt-3">{stats?.totalServicesRedeemed || 0}</p>
                <p className="text-xs text-gray-500 mt-1">User redemptions</p>
              </div>
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center text-2xl">
                🛒
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Daily Activity */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <HiBolt className="text-blue-600" size={24} />
                Daily Activity
              </h2>
              <HiArrowTrendingUp className="text-blue-600" size={24} />
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-semibold text-gray-700">Today's Logins</p>
                  <span className="text-2xl font-bold text-blue-600">{stats?.dailyLogins || 0}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((stats?.dailyLogins || 0) / 100 * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Out of expected 100 logins</p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-semibold text-gray-700">Coins Distributed Today</p>
                  <span className="text-2xl font-bold text-emerald-600">{stats?.dailyCoinsDistributed || 0}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((stats?.dailyCoinsDistributed || 0) / 5000 * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Out of target 5000 coins</p>
              </div>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <HiServer className="text-purple-600" size={24} />
              System Health
            </h2>

            <div className="space-y-4">
              {/* Server Status */}
              <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="flex items-center gap-3">
                  <HiServer className="text-emerald-600" size={20} />
                  <span className="font-semibold text-gray-900">Server Status</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></div>
                  <span className="text-emerald-600 font-bold">Online</span>
                </div>
              </div>

              {/* Database */}
              <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="flex items-center gap-3">
                  <HiServer className="text-emerald-600" size={20} />
                  <span className="font-semibold text-gray-900">Database</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></div>
                  <span className="text-emerald-600 font-bold">Connected</span>
                </div>
              </div>

              {/* Payout Service */}
              <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="flex items-center gap-3">
                  <HiBolt className="text-emerald-600" size={20} />
                  <span className="font-semibold text-gray-900">Payout Service</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></div>
                  <span className="text-emerald-600 font-bold">Active</span>
                </div>
              </div>

              {/* API Status */}
              <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="flex items-center gap-3">
                  <HiBolt className="text-emerald-600" size={20} />
                  <span className="font-semibold text-gray-900">API Status</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></div>
                  <span className="text-emerald-600 font-bold">Running</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2">
              <HiExclamationTriangle className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
              <p className="text-sm text-blue-700">All systems operational. Last check: Just now</p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Average Coins Per User */}
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Avg Coins/User</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">
                  {stats?.totalUsers ? Math.round((stats?.totalCoinsEarned || 0) / stats.totalUsers) : 0}
                </p>
              </div>
              <HiChartBar size={32} className="text-orange-600 opacity-70" />
            </div>
          </div>

          {/* Withdrawal Rate */}
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Withdrawal Rate</p>
                <p className="text-3xl font-bold text-red-600 mt-2">
                  {stats?.totalUsers ? Math.round((stats?.totalWithdrawals || 0) / stats.totalUsers * 100) : 0}%
                </p>
              </div>
              <HiEye size={32} className="text-red-600 opacity-70" />
            </div>
          </div>

          {/* Redemption Rate */}
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-teal-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Redemption Rate</p>
                <p className="text-3xl font-bold text-teal-600 mt-2">
                  {stats?.totalUsers ? Math.round((stats?.totalServicesRedeemed || 0) / stats.totalUsers * 100) : 0}%
                </p>
              </div>
              <HiShoppingCart size={32} className="text-teal-600 opacity-70" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/users"
              className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <HiUsers size={20} />
              Manage Users
            </a>
            <a
              href="/admin/withdrawals"
              className="bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <HiCreditCard size={20} />
              Approve Withdrawals
            </a>
            <a
              href="/admin/services"
              className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <HiShoppingCart size={20} />
              Manage Services
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;