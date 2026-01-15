import React, { useState, useEffect } from 'react';
import adminService from '../services/adminService';
import { HiArrowDownTray, HiCalendar, HiDocumentText } from 'react-icons/hi2';

const Reports = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetchReportData();
  }, [selectedDate]);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      const data = await adminService.getDailyReport(selectedDate);
      setReportData(data);
    } catch (error) {
      console.error('Failed to fetch report data:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async () => {
    try {
      setDownloading(true);
      await adminService.downloadDailyReport(selectedDate);
    } catch (error) {
      console.error('Failed to download report:', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Daily Reports</h1>
        <p className="text-gray-600">Generate and download daily activity reports</p>
      </div>

      {/* Date Selector */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <HiCalendar className="text-emerald-600" size={20} />
            <label className="font-semibold text-gray-700">Select Date:</label>
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
          <button
            onClick={downloadReport}
            disabled={downloading}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <HiArrowDownTray size={18} />
            {downloading ? 'Downloading...' : 'Download CSV'}
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      {reportData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-emerald-600 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">New Users</p>
                <p className="text-3xl font-bold text-emerald-600 mt-2">{reportData.summary.newUsersCount}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-2xl">
                👥
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-600 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Transactions</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{reportData.summary.transactionsCount}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                💳
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-amber-600 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Withdrawals</p>
                <p className="text-3xl font-bold text-amber-600 mt-2">{reportData.summary.withdrawalsCount}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-2xl">
                💰
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-purple-600 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Referrals</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">{reportData.summary.referralsCount}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl">
                🔗
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Sections */}
      {reportData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* New Users */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <HiDocumentText className="text-emerald-600" size={24} />
              <h2 className="text-xl font-bold text-gray-900">New Users ({reportData.newUsers.length})</h2>
            </div>

            {reportData.newUsers.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {reportData.newUsers.map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No new users on this date</p>
            )}
          </div>

          {/* Transactions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <HiDocumentText className="text-blue-600" size={24} />
              <h2 className="text-xl font-bold text-gray-900">Transactions ({reportData.transactions.length})</h2>
            </div>

            {reportData.transactions.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {reportData.transactions.map((tx, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">{tx.user?.name || 'N/A'}</p>
                      <p className="text-sm text-gray-600">{tx.type} - {tx.status}</p>
                    </div>
                    <span className="font-bold text-blue-600">₹{tx.amount}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No transactions on this date</p>
            )}
          </div>

          {/* Withdrawals */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <HiDocumentText className="text-amber-600" size={24} />
              <h2 className="text-xl font-bold text-gray-900">Withdrawals ({reportData.withdrawals.length})</h2>
            </div>

            {reportData.withdrawals.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {reportData.withdrawals.map((w, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">{w.user?.name || 'N/A'}</p>
                      <p className="text-sm text-gray-600">{w.status}</p>
                    </div>
                    <span className="font-bold text-amber-600">₹{w.amount}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No withdrawals on this date</p>
            )}
          </div>

          {/* Referrals */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <HiDocumentText className="text-purple-600" size={24} />
              <h2 className="text-xl font-bold text-gray-900">Referrals ({reportData.referrals.length})</h2>
            </div>

            {reportData.referrals.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {reportData.referrals.map((r, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">{r.referrer?.name || 'N/A'}</p>
                      <p className="text-sm text-gray-600">→ {r.referred?.name || 'N/A'}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      r.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {r.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No referrals on this date</p>
            )}
          </div>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default Reports;
