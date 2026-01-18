import React, { useState, useEffect } from 'react';
import * as referralService from '../services/referralService';
import {
  HiUsers,
  HiShare,
  HiClipboard,
  HiCheck
} from 'react-icons/hi2';

const Referrals = () => {
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
      console.log('📦 Referral stats:', data);
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
      const res = await referralService.generateReferralCode();

      // 🔥 SINGLE SOURCE OF TRUTH
      setReferralData(prev => ({
        ...prev,
        referralCode: res.referralCode
      }));

    } catch (error) {
      console.error('Failed to generate referral code:', error);
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    if (!referralData?.referralCode) return;

    await navigator.clipboard.writeText(referralData.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareReferralLink = () => {
    if (!referralData?.referralCode) return;

    const referralUrl = `${window.location.origin}/signup?ref=${referralData.referralCode}`;
    navigator.clipboard.writeText(referralUrl);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading referrals...
      </div>
    );
  }

  const code = referralData?.referralCode;

  return (
    <div className="min-h-screen bg-emerald-50 py-8">
      <div className="max-w-6xl mx-auto px-4">

        <h1 className="text-4xl font-bold mb-2">My Referrals</h1>
        <p className="text-gray-600 mb-8">
          Invite friends and earn rewards together
        </p>

        {/* REFERRAL CODE */}
        <div className="bg-white p-8 rounded-xl shadow mb-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Your Referral Code</h2>

          {code ? (
            <>
              <div className="flex justify-center gap-4 mb-4">
                <div className="px-6 py-3 border-2 border-emerald-400 rounded-lg font-mono text-2xl text-emerald-600">
                  {code}
                </div>

                <button
                  onClick={copyToClipboard}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg"
                >
                  {copied ? <HiCheck /> : <HiClipboard />}
                </button>

                <button
                  onClick={shareReferralLink}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg"
                >
                  <HiShare />
                </button>
              </div>

              <p className="text-sm bg-gray-100 p-2 rounded break-all">
                {`${window.location.origin}/signup?ref=${code}`}
              </p>
            </>
          ) : (
            <button
              onClick={generateReferralCode}
              disabled={generating}
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg"
            >
              {generating ? 'Generating...' : 'Generate Referral Code'}
            </button>
          )}
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Referrals" value={referralData?.totalReferrals || 0} />
          <StatCard title="Completed" value={referralData?.completedReferrals || 0} />
          <StatCard title="Coins Earned" value={referralData?.totalCoinsEarned || 0} />
        </div>

        {/* TABLE */}
        <div className="bg-white p-8 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <HiUsers /> Referred Users
          </h2>

          {referralData?.referrals?.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Email</th>
                  <th className="text-left py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {referralData.referrals.map((r, i) => (
                  r.referred && (
                    <tr key={i} className="border-b">
                      <td className="py-2">{r.referred.name}</td>
                      <td className="py-2">{r.referred.email}</td>
                      <td className="py-2">
                        {r.status === 'completed' ? 'Active' : 'Pending'}
                      </td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 text-center py-6">
              No referrals yet
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow border-l-4 border-emerald-600">
    <p className="text-gray-600">{title}</p>
    <p className="text-3xl font-bold text-emerald-600">{value}</p>
  </div>
);

export default Referrals;
