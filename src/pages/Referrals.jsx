import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import * as referralService from '../services/referralService';
import { HiUsers, HiCurrencyDollar, HiShare, HiClipboard, HiCheck } from 'react-icons/hi2';

const Referrals = () => {
  const { user } = useAuth();
  const [referralData, setReferralData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchReferralData();
  }, []);

  const fetchReferralData = async () => {
    try {
      setLoading(true);
      const data = await referralService.getReferralStats();
      setReferralData(data);
    } catch (error) {
      console.error('Failed to fetch referral data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateReferralCode = async () => {
    try {
      setGenerating(true);
      await referralService.generateReferralCode();
      await fetchReferralData(); // Refresh data
    } catch (error) {
      console.error('Failed to generate referral code:', error);
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    if (referralData?.referralCode) {
      try {
        await navigator.clipboard.writeText(referralData.referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    }
  };

  const shareReferralLink = () => {
    if (referralData?.referralCode) {
      const referralUrl = `${window.location.origin}/signup?ref=${referralData.referralCode}`;
      if (navigator.share) {
        navigator.share({
          title: 'Join our rewards program!',
          text: 'Use my referral code to get started and earn rewards together!',
          url: referralUrl
        });
      } else {
        copyToClipboard();
      }
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
                <span className="text-2xl">👥</span>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Referrals...</h2>
          <p className="text-gray-600">Please wait while we fetch your referral data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Referrals</h1>
          <p className="text-lg text-gray-600">Invite friends and earn rewards together</p>
        </div>

        {/* Referral Code Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Referral Code</h2>
            {referralData?.referralCode ? (
              <div className="flex items-center justify-center gap-4">
                <div className="bg-emerald-50 border-2 border-emerald-200 rounded-lg px-6 py-4">
                  <span className="text-2xl font-mono font-bold text-emerald-600">
                    {referralData.referralCode}
                  </span>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  {copied ? <HiCheck size={20} /> : <HiClipboard size={20} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={shareReferralLink}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  <HiShare size={20} />
                  Share Link
                </button>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 mb-4">Generate your unique referral code to start earning rewards</p>
                <button
                  onClick={generateReferralCode}
                  disabled={generating}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generating ? 'Generating...' : 'Generate Referral Code'}
                </button>
              </div>
            )}
          </div>

          {/* Referral Link */}
          {referralData?.referralCode && (
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">Share this link:</p>
              <p className="text-sm font-mono bg-white p-2 rounded border break-all">
                {`${window.location.origin}/signup?ref=${referralData.referralCode}`}
              </p>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-emerald-600 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Referrals</p>
                <p className="text-3xl font-bold text-emerald-600 mt-2">{referralData?.totalReferrals || 0}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-2xl">
                👥
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-600 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Completed Referrals</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{referralData?.completedReferrals || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                ✅
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-amber-600 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Coins Earned</p>
                <p className="text-3xl font-bold text-amber-600 mt-2">{referralData?.totalCoinsEarned || 0}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-2xl">
                💰
              </div>
            </div>
          </div>
        </div>

        {/* Referred Users */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex items-center gap-3 mb-6">
            <HiUsers className="text-emerald-600" size={28} />
            <h2 className="text-2xl font-bold text-gray-900">Referred Users</h2>
          </div>

          {referralData?.referrals?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Email</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Joined Date</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {referralData.referrals.map((referredUser, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-emerald-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">{referredUser.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-700">{referredUser.email}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-700">
                          {new Date(referredUser.createdAt).toLocaleDateString('en-IN')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          referredUser.serviceActivated
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {referredUser.serviceActivated ? 'Active' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-12 text-center">
              <HiUsers size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg font-medium">
                No referrals yet
              </p>
              <p className="text-gray-500 mt-2">
                Share your referral code to start earning rewards when friends join!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Referrals;
