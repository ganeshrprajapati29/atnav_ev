import React, { useEffect, useState } from 'react';
import { GiTrophy as Trophy, GiCrown as Crown, GiMedal as Medal, GiAchievement as Award } from 'react-icons/gi';
import { HiStar as Star } from 'react-icons/hi2';
import { getLeaderboard } from '../services/userService';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await getLeaderboard();
      setLeaderboard(data);
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTierIcon = (tier) => {
    switch (tier) {
      case 'Platinum':
        return <Crown className="text-purple-600" size={24} />;
      case 'Gold':
        return <Award className="text-yellow-600" size={24} />;
      case 'Silver':
        return <Medal className="text-gray-600" size={24} />;
      default:
        return <Star className="text-gray-400" size={24} />;
    }
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'Platinum':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Gold':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Silver':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
        <div className="text-center">
          <div className="inline-block mb-6">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-emerald-600 border-r-emerald-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl">🏆</span>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Leaderboard...</h2>
          <p className="text-gray-600">Fetching top performers</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
              <Trophy className="text-white" size={32} />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Leaderboard</h1>
          <p className="text-lg text-gray-600">Top performers in our reward system</p>
        </div>

        {/* Top 3 Podium */}
        {leaderboard.length >= 3 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* 2nd Place */}
            <div className="order-1 md:order-1">
              <div className="bg-white rounded-xl shadow-md p-6 text-center border-2 border-gray-200">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-gray-600">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{leaderboard[1]?.name}</h3>
                <div className="flex items-center justify-center gap-2 mb-3">
                  {getTierIcon(leaderboard[1]?.tier)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getTierColor(leaderboard[1]?.tier)}`}>
                    {leaderboard[1]?.tier}
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-700">{leaderboard[1]?.totalCoins || 0}</p>
                <p className="text-sm text-gray-500">Coins</p>
              </div>
            </div>

            {/* 1st Place */}
            <div className="order-2 md:order-2">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl shadow-lg p-8 text-center text-white relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Crown className="text-yellow-400" size={32} />
                </div>
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 mt-4">
                  <Trophy className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2">{leaderboard[0]?.name}</h3>
                <div className="flex items-center justify-center gap-2 mb-3">
                  {getTierIcon(leaderboard[0]?.tier)}
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-white bg-opacity-20 text-white border-white border">
                    {leaderboard[0]?.tier}
                  </span>
                </div>
                <p className="text-4xl font-bold">{leaderboard[0]?.totalCoins || 0}</p>
                <p className="text-sm opacity-90">Coins</p>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="order-3 md:order-3">
              <div className="bg-white rounded-xl shadow-md p-6 text-center border-2 border-orange-200">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{leaderboard[2]?.name}</h3>
                <div className="flex items-center justify-center gap-2 mb-3">
                  {getTierIcon(leaderboard[2]?.tier)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getTierColor(leaderboard[2]?.tier)}`}>
                    {leaderboard[2]?.tier}
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-700">{leaderboard[2]?.totalCoins || 0}</p>
                <p className="text-sm text-gray-500">Coins</p>
              </div>
            </div>
          </div>
        )}

        {/* Full Leaderboard */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-xl font-bold text-gray-900">Full Rankings</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Coins</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Login Count</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaderboard.map((user, index) => (
                  <tr key={user._id} className={index < 3 ? 'bg-gradient-to-r from-emerald-50 to-transparent' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {index === 0 && <Trophy className="text-yellow-500 mr-2" size={20} />}
                        {index === 1 && <Medal className="text-gray-500 mr-2" size={20} />}
                        {index === 2 && <Award className="text-orange-500 mr-2" size={20} />}
                        <span className={`text-sm font-medium ${index < 3 ? 'text-emerald-600' : 'text-gray-900'}`}>
                          #{index + 1}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-sm font-medium text-emerald-600">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getTierColor(user.tier)}`}>
                        {getTierIcon(user.tier)}
                        <span className="ml-1">{user.tier}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                      {user.totalCoins || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.loginCount || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {leaderboard.length === 0 && (
            <div className="px-6 py-12 text-center">
              <Trophy className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-sm font-medium text-gray-900 mb-2">No users yet</h3>
              <p className="text-sm text-gray-500">Start earning coins to appear on the leaderboard!</p>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-10 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Climb the Ranks?</h2>
          <p className="text-lg mb-6 opacity-90">
            Login daily, complete services, and earn more coins to reach the top!
          </p>
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
