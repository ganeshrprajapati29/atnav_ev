import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import * as rewardService from '../services/rewardService';
import { Coins, History, Trophy, TrendingUp, Calendar, Award, AlertCircle, Download } from 'lucide-react';

const Rewards = () => {
  const { user } = useAuth();
  const [rewards, setRewards] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      setLoading(true);
      const [rewardsData, statsData] = await Promise.all([
        rewardService.getRewards(),
        rewardService.getRewardStats()
      ]);
      setRewards(rewardsData);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to fetch rewards:', error);
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
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Rewards...</h2>
          <p className="text-gray-600">Please wait while we fetch your data</p>
        </div>
      </div>
    );
  }

  const filteredRewards = rewards.filter(reward => {
    if (filter === 'all') return true;
    return reward.reason.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Rewards</h1>
          <p className="text-lg text-gray-600">Track your coin earnings and reward history</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Total Coins Card */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-emerald-600 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Wallet Coins Earned</p>
                <p className="text-4xl font-bold text-emerald-600 mt-3">{user?.totalCoins || 0}</p>
                <div className="flex items-center gap-1 mt-2 text-emerald-600 text-sm">
                  <TrendingUp size={16} />
                  <span>Lifetime earnings</span>
                </div>
              </div>
              <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center text-3xl">
                💰
              </div>
            </div>
          </div>

          {/* Total Rewards Card */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-600 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Rewards</p>
                <p className="text-4xl font-bold text-blue-600 mt-3">{stats.totalRewards || 0}</p>
                <div className="flex items-center gap-1 mt-2 text-blue-600 text-sm">
                  <History size={16} />
                  <span>Reward actions</span>
                </div>
              </div>
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-3xl">
                📊
              </div>
            </div>
          </div>

          {/* Current Tier Card */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-amber-600 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Current Tier</p>
                <p className={`text-4xl font-bold mt-3 ${
                  user?.tier === 'Platinum' ? 'text-purple-600' :
                  user?.tier === 'Gold' ? 'text-amber-600' : 'text-gray-600'
                }`}>
                  {user?.tier || 'Silver'}
                </p>
                <div className="flex items-center gap-1 mt-2 text-amber-600 text-sm">
                  <Trophy size={16} />
                  <span>Premium member</span>
                </div>
              </div>
              <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center text-3xl">
                {user?.tier === 'Platinum' ? '💎' : user?.tier === 'Gold' ? '🥇' : '🥈'}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Average per Reward */}
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Average Per Reward</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {stats.totalRewards > 0 ? Math.round((user?.totalCoins || 0) / stats.totalRewards) : 0}
                </p>
              </div>
              <Award size={32} className="text-green-600 opacity-70" />
            </div>
          </div>

          {/* Last Earned */}
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Last Reward Date</p>
                <p className="text-2xl font-bold text-purple-600 mt-2">
                  {rewards.length > 0 ? new Date(rewards[0].createdAt).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  }) : 'N/A'}
                </p>
              </div>
              <Calendar size={32} className="text-purple-600 opacity-70" />
            </div>
          </div>
        </div>

        {/* Rewards History */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <History className="text-emerald-600" size={28} />
              <h2 className="text-2xl font-bold text-gray-900">Reward History</h2>
            </div>
            <button className="flex items-center gap-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-semibold py-2 px-4 rounded-lg transition-colors">
              <Download size={18} />
              Export
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="mb-6 flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Rewards
            </button>
            <button
              onClick={() => setFilter('login')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'login'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Daily Login
            </button>
            <button
              onClick={() => setFilter('bonus')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'bonus'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Bonus
            </button>
            <button
              onClick={() => setFilter('referral')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'referral'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Referral
            </button>
          </div>

          {/* Rewards Table */}
          {filteredRewards.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Date</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Reason</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Tier</th>
                    <th className="px-6 py-4 text-right font-semibold text-gray-700">Coins</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRewards.map((reward, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-emerald-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-gray-400" />
                          <span className="text-gray-800 font-medium">
                            {new Date(reward.createdAt).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {reward.reason}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          reward.tierAtTime === 'Platinum' 
                            ? 'bg-purple-100 text-purple-800'
                            : reward.tierAtTime === 'Gold'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {reward.tierAtTime}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-emerald-600 font-bold text-lg flex items-center justify-end gap-1">
                          <Coins size={18} />
                          +{reward.coinsEarned}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-12 text-center">
              <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg font-medium">
                {rewards.length === 0 
                  ? 'No rewards earned yet. Login daily to earn coins!' 
                  : 'No rewards found with selected filter.'}
              </p>
              {rewards.length === 0 && (
                <p className="text-gray-500 mt-2">Complete tasks and daily logins to start earning rewards</p>
              )}
            </div>
          )}

          {/* Results Count */}
          {filteredRewards.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-600 text-center">
              Showing {filteredRewards.length} of {rewards.length} rewards
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rewards;