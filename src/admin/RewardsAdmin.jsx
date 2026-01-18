import React, { useEffect, useState } from 'react';
import { FaChartLine } from 'react-icons/fa';
import * as rewardService from '../services/rewardService';
import { HiCheckBadge, HiUsers } from 'react-icons/hi2';

const RewardsAdmin = () => {
  const [stats, setStats] = useState({});
  const [recentRewards, setRecentRewards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsData, rewardsData] = await Promise.all([
        rewardService.getRewardStats(),
        rewardService.getRewards()
      ]);
      setStats(statsData);
      setRecentRewards(rewardsData.slice(0, 10));
    } catch (error) {
      console.error('Failed to fetch rewards data:', error);
    } finally {
      setLoading(false);
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
                <span className="text-2xl">🎁</span>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Rewards Data...</h2>
          <p className="text-gray-600">Please wait while analytics load</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Rewards Analytics</h1>
          <p className="text-lg text-gray-600">Monitor coin distribution & user reward patterns</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          
          {/* Total Coins Earned */}
          <div className="bg-white rounded-xl shadow-md border-l-4 border-yellow-500 p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Wallet Coins Earned</p>
                <p className="text-4xl font-bold text-yellow-500 mt-3">{stats.totalCoinsEarned || 0}</p>
              </div>
              <div className="text-3xl">💰</div>
            </div>
          </div>

          {/* Total Rewards */}
          <div className="bg-white rounded-xl shadow-md border-l-4 border-blue-600 p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Rewards Given</p>
                <p className="text-4xl font-bold text-blue-600 mt-3">{stats.totalRewards || 0}</p>
              </div>
              <FaChartLine className="text-blue-600 text-3xl" />
            </div>
          </div>

          {/* Active Users */}
          <div className="bg-white rounded-xl shadow-md border-l-4 border-green-600 p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600 font-medium">Active Users</p>
                <p className="text-4xl font-bold text-green-600 mt-3">{stats.activeUsers || 0}</p>
              </div>
              <HiUsers className="text-green-600" size={38} />
            </div>
          </div>

          {/* Platinum Users */}
          <div className="bg-white rounded-xl shadow-md border-l-4 border-purple-600 p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600 font-medium">Platinum Users</p>
                <p className="text-4xl font-bold text-purple-600 mt-3">{stats.platinumUsers || 0}</p>
              </div>
              <HiCheckBadge className="text-purple-600" size={38} />
            </div>
          </div>
        </div>

        {/* Tier Distribution & Average Rewards Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

          {/* Tier Distribution */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Tier Distribution</h2>

            <div className="space-y-6">
              {['Silver', 'Gold', 'Platinum'].map((tier) => {
                const color =
                  tier === 'Silver'
                    ? 'gray'
                    : tier === 'Gold'
                    ? 'yellow'
                    : 'purple';

                const value = stats[`${tier.toLowerCase()}Users`] || 0;

                return (
                  <div key={tier}>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>{tier} Users</span>
                      <span>{value}</span>
                    </div>
                    <div className="w-full h-4 bg-gray-200 rounded-full">
                      <div
                        className={`h-4 bg-${color}-500 rounded-full`}
                        style={{
                          width: `${
                            stats.totalUsers
                              ? (value / stats.totalUsers) * 100
                              : 0
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Average Rewards */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Average Rewards by Tier</h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <div className="w-4 h-4 bg-gray-500 rounded mr-2"></div>
                  Silver
                </span>
                <span className="font-semibold">{stats.avgSilverReward || 0} coins</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
                  Gold
                </span>
                <span className="font-semibold">{stats.avgGoldReward || 0} coins</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <div className="w-4 h-4 bg-purple-500 rounded mr-2"></div>
                  Platinum
                </span>
                <span className="font-semibold">{stats.avgPlatinumReward || 0} coins</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Rewards Table */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Recent Rewards</h2>

          {recentRewards.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left font-medium text-gray-700">User</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Reason</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Tier</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Coins</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRewards.map((reward, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">{reward.user ? reward.user.name : 'Unknown User'}</td>
                      <td className="px-4 py-2">{reward.reason}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            reward.tierAtTime === 'Platinum'
                              ? 'bg-purple-100 text-purple-800'
                              : reward.tierAtTime === 'Gold'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {reward.tierAtTime}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-green-600 font-semibold">
                        +{reward.coinsEarned}
                      </td>
                      <td className="px-4 py-2">
                        {reward.date
                          ? new Date(reward.date).toLocaleDateString()
                          : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No recent rewards</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RewardsAdmin;
