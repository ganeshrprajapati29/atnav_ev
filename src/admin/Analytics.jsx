import React, { useEffect, useState } from 'react';
import { FaChartLine, FaUsers, FaCoins, FaShoppingCart, FaCreditCard, FaCalendarAlt } from 'react-icons/fa';
import adminService from '../services/adminService';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-emerald-600 border-r-emerald-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 text-lg">Loading Analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Comprehensive system analytics and insights</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Users</p>
                <p className="text-3xl font-bold text-emerald-600 mt-2">{analytics?.totalUsers || 0}</p>
              </div>
              <FaUsers className="text-emerald-600 text-2xl" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Wallet Coins</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{analytics?.totalCoins || 0}</p>
              </div>
              <FaCoins className="text-blue-600 text-2xl" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Services</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">{analytics?.totalServices || 0}</p>
              </div>
              <FaShoppingCart className="text-purple-600 text-2xl" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Pending Withdrawals</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">{analytics?.pendingWithdrawals || 0}</p>
              </div>
              <FaCreditCard className="text-orange-600 text-2xl" />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <FaChartLine className="text-emerald-600" size={24} />
              <h2 className="text-xl font-bold text-gray-900">User Registration Trend</h2>
            </div>
            <div className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <FaChartLine size={48} className="mx-auto mb-4 opacity-50" />
                <p>Chart visualization would go here</p>
                <p className="text-sm">Integration with charting library needed</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <FaCalendarAlt className="text-blue-600" size={24} />
              <h2 className="text-xl font-bold text-gray-900">Monthly Activity</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">This Month</span>
                <span className="text-emerald-600 font-bold">{analytics?.monthlyActiveUsers || 0} active users</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Last Month</span>
                <span className="text-blue-600 font-bold">{analytics?.lastMonthActiveUsers || 0} active users</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Growth Rate</span>
                <span className="text-purple-600 font-bold">+{analytics?.growthRate || 0}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <FaCalendarAlt className="text-gray-600" size={24} />
            <h2 className="text-xl font-bold text-gray-900">Recent System Activity</h2>
          </div>
          <div className="space-y-4">
            {analytics?.recentActivity?.length > 0 ? (
              analytics.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">{activity.description}</p>
                    <p className="text-sm text-gray-500">{new Date(activity.timestamp).toLocaleString()}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    activity.type === 'user' ? 'bg-emerald-100 text-emerald-800' :
                    activity.type === 'withdrawal' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {activity.type}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FaCalendarAlt size={48} className="mx-auto mb-4 opacity-50" />
                <p>No recent activity to display</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;
