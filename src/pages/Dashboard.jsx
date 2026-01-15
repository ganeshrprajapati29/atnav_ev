
import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AppContext } from '../context/AppContext';
import { transferCoins } from '../services/userService';
import QRCode from 'qrcode.react';

// ✅ FIXED ICON IMPORTS (lucide-react latest version)
import {
  Gift,
  TrendingUp,
  LogIn,
  Zap,
  AlertCircle,
  ChevronRight,
  Award,
  CalendarDays,
  Send,
  QrCode,
  Download
} from 'lucide-react';
const Dashboard = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { dashboardData, loading, fetchDashboardData } = useContext(AppContext);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [transferData, setTransferData] = useState({ recipientId: '', amount: '' });
  const [transferLoading, setTransferLoading] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block mb-6">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-emerald-600 border-r-emerald-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Dashboard...</h2>
          <p className="text-gray-600">Please wait while we fetch your data</p>
        </div>
      </div>
    );
  }

  const isServiceActivated = user?.serviceActivated;

  const handleTransferCoins = async () => {
    if (!transferData.recipientId || !transferData.amount) {
      alert('Please fill in all fields');
      return;
    }

    if (parseInt(transferData.amount) <= 0) {
      alert('Amount must be greater than 0');
      return;
    }

    if (parseInt(transferData.amount) > user.totalCoins) {
      alert('Insufficient coins');
      return;
    }

    setTransferLoading(true);
    try {
      await transferCoins(transferData.recipientId, parseInt(transferData.amount));
      // Update user coins locally
      updateUser({ ...user, totalCoins: user.totalCoins - parseInt(transferData.amount) });
      setShowTransferModal(false);
      setTransferData({ recipientId: '', amount: '' });
      alert('Coins transferred successfully!');
      fetchDashboardData(); // Refresh dashboard data
    } catch (error) {
      alert(error.response?.data?.message || 'Transfer failed');
    } finally {
      setTransferLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Service Activation Banner */}
        {!isServiceActivated && (
          <div className="mb-8 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="text-amber-600" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-amber-800">Service Not Activated</h3>
                  <p className="text-amber-700">Complete payment of ₹100 to unlock all features and services.</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/payment')}
                className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Pay ₹100 Now
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}! 👋</h1>
          <p className="text-lg text-gray-600">Here's your complete reward system overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          {/* Coins */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-emerald-600 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Coins</p>
                <p className="text-3xl font-bold text-emerald-600 mt-2">{user?.totalCoins || 0}</p>
                <p className="text-xs text-gray-500 mt-1">Available to use</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-2xl">💰</div>
            </div>
          </div>

          {/* Tier */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-amber-500 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Current Tier</p>
                <p className={`text-3xl font-bold mt-2 ${
                  user?.tier === 'Platinum' ? 'text-purple-600' :
                  user?.tier === 'Gold' ? 'text-amber-600' : 'text-gray-600'
                }`}>
                  {user?.tier || 'Silver'}
                </p>
                <p className="text-xs text-gray-500 mt-1">Premium member</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-2xl">
                {user?.tier === 'Platinum' ? '💎' : user?.tier === 'Gold' ? '🥇' : '🥈'}
              </div>
            </div>
          </div>

          {/* Logins */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Login Count</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{user?.loginCount || 0}</p>
                <p className="text-xs text-gray-500 mt-1">Total logins</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">📊</div>
            </div>
          </div>

          {/* Pending Withdrawals */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-600 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Pending Withdrawals</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{dashboardData?.pendingWithdrawals || 0}</p>
                <p className="text-xs text-gray-500 mt-1">In progress</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">💳</div>
            </div>
          </div>

        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

          {/* Recent Rewards */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <Gift className="text-emerald-600" size={24} />
              <h2 className="text-xl font-bold text-gray-900">Recent Rewards</h2>
            </div>

            {dashboardData?.recentRewards?.length > 0 ? (
              dashboardData.recentRewards.map((reward, index) => (
                <div key={index} className="flex items-center justify-between p-4 hover:bg-emerald-50 rounded-lg transition-colors border-b border-gray-100 last:border-b-0">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mt-1">
                      <Gift size={18} className="text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{reward.reason}</p>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                        <CalendarDays size={14} />
                        {new Date(reward.createdAt).toLocaleDateString('en-IN')}
                      </div>
                    </div>
                  </div>
                  <span className="text-green-600 font-bold text-lg">+{reward.coinsEarned}</span>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                <AlertCircle size={32} className="mb-2 opacity-50" />
                <p>No recent rewards</p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="text-emerald-600" size={24} />
              <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => navigate('/rewards')}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <TrendingUp size={18} />
                View All Rewards
              </button>

              <button
                onClick={() => navigate('/services')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Gift size={18} />
                Redeem Services
              </button>

              <button
                onClick={() => setShowTransferModal(true)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Send Coins
              </button>

              <button
                onClick={() => setShowQRModal(true)}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <QrCode size={18} />
                Receive Coins
              </button>

              {user?.totalCoins >= 500 ? (
                <button
                  onClick={() => navigate('/withdraw')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <LogIn size={18} />
                  Request Withdrawal
                </button>
              ) : (
                <div className="w-full bg-gray-100 text-gray-500 font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed">
                  <AlertCircle size={18} />
                  Need 500+ coins
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tier Progress */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-8">
            <Award className="text-emerald-600" size={24} />
            <h2 className="text-xl font-bold text-gray-900">Tier Progress</h2>
          </div>

          <div className="space-y-8">
            {/* Silver */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🥈</span>
                  <span className="font-semibold text-gray-900">Silver</span>
                  <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">(0-999 coins)</span>
                </div>
                <span className="text-sm font-bold text-gray-700">{Math.min(user?.totalCoins || 0, 1000)}/1000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-gray-400 to-gray-500 h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min((user?.totalCoins || 0) / 1000 * 100, 100)}%`
                  }}
                ></div>
              </div>
              {user?.totalCoins >= 1000 && (
                <p className="text-sm text-green-600 font-semibold flex items-center gap-1">
                  <ChevronRight size={16} /> Unlocked!
                </p>
              )}
            </div>

            {/* Gold */}
            {user?.totalCoins >= 1000 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🥇</span>
                    <span className="font-semibold text-gray-900">Gold</span>
                    <span className="text-xs text-gray-600 bg-amber-100 px-2 py-1 rounded">(1000-4999 coins)</span>
                  </div>
                  <span className="text-sm font-bold text-gray-700">{Math.min(user?.totalCoins || 0, 5000)}/5000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-400 to-amber-500 h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(((user?.totalCoins || 0) - 1000) / 4000 * 100, 100)}%`
                    }}
                  ></div>
                </div>
                {user?.totalCoins >= 5000 && (
                  <p className="text-sm text-green-600 font-semibold flex items-center gap-1">
                    <ChevronRight size={16} /> Unlocked!
                  </p>
                )}
              </div>
            )}

            {/* Platinum */}
            {user?.totalCoins >= 5000 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">💎</span>
                    <span className="font-semibold text-gray-900">Platinum</span>
                    <span className="text-xs text-gray-600 bg-purple-100 px-2 py-1 rounded">(5000+ coins)</span>
                  </div>
                  <span className="text-sm font-bold text-purple-600">Achieved! 🎉</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-400 to-purple-500 h-3 rounded-full w-full"></div>
                </div>
                <p className="text-sm text-purple-600 font-semibold flex items-center gap-1">
                  <ChevronRight size={16} /> You're a VIP member!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Transfer Coins Modal */}
        {showTransferModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md mx-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Transfer Coins</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipient Unique ID
                  </label>
                  <input
                    type="text"
                    value={transferData.recipientId}
                    onChange={(e) => setTransferData({ ...transferData, recipientId: e.target.value })}
                    placeholder="Enter recipient's unique ID"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (Available: {user?.totalCoins || 0})
                  </label>
                  <input
                    type="number"
                    value={transferData.amount}
                    onChange={(e) => setTransferData({ ...transferData, amount: e.target.value })}
                    placeholder="Enter amount"
                    min="1"
                    max={user?.totalCoins || 0}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  onClick={handleTransferCoins}
                  disabled={transferLoading}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {transferLoading ? 'Transferring...' : 'Transfer'}
                </button>
                <button
                  onClick={() => {
                    setShowTransferModal(false);
                    setTransferData({ recipientId: '', amount: '' });
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Receive Coins QR Modal */}
        {showQRModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md mx-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Receive Coins</h2>

              <div className="text-center space-y-4">
                <p className="text-gray-600">Share this QR code or your Unique ID to receive coins</p>

                <div className="flex justify-center">
                  <QRCode
                    value={user?.uniqueId || ''}
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Your Unique ID:</p>
                  <p className="font-mono text-lg font-bold text-gray-800">{user?.uniqueId}</p>
                </div>

                <button
                  onClick={() => navigator.clipboard.writeText(user?.uniqueId)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Copy Unique ID
                </button>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowQRModal(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
