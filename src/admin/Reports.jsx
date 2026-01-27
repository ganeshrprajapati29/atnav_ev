import React, { useEffect, useState } from 'react';
import adminService from '../services/adminService';
import {
  Download,
  Calendar,
  FileText,
  Users,
  CreditCard,
  Wallet,
  Link2
} from 'lucide-react';

const Reports = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] =
    useState(new Date().toISOString().split('T')[0]);
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

      <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex items-center gap-4">
        <Calendar size={20} className="text-emerald-600" />
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
        />

        <button
          onClick={downloadReport}
          disabled={downloading}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
        >
          <Download size={18} />
          {downloading ? 'Downloading...' : 'Download CSV'}
        </button>
      </div>

      {reportData && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-600">
            <p className="text-sm text-gray-600">New Users</p>
            <p className="text-3xl font-bold text-emerald-600">
              {reportData.summary.newUsersCount}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600">
            <p className="text-sm text-gray-600">Transactions</p>
            <p className="text-3xl font-bold text-blue-600">
              {reportData.summary.transactionsCount}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-600">
            <p className="text-sm text-gray-600">Withdrawals</p>
            <p className="text-3xl font-bold text-amber-600">
              {reportData.summary.withdrawalsCount}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-600">
            <p className="text-sm text-gray-600">Referrals</p>
            <p className="text-3xl font-bold text-purple-600">
              {reportData.summary.referralsCount}
            </p>
          </div>

        </div>
      )}

      {/* Detailed Sections */}
      {reportData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <Users size={24} className="text-emerald-600" />
              <h2 className="text-xl font-bold">New Users</h2>
            </div>

            {reportData.newUsers.length === 0 ? (
              <p className="text-gray-500">No new users.</p>
            ) : (
              reportData.newUsers.map((u, i) => (
                <div className="p-3 bg-gray-50 rounded-lg mb-2" key={i}>
                  <p className="font-semibold">{u.name}</p>
                  <p className="text-sm">{u.email}</p>
                </div>
              ))
            )}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <CreditCard size={24} className="text-blue-600" />
              <h2 className="text-xl font-bold">Transactions</h2>
            </div>

            {reportData.transactions.length === 0 ? (
              <p className="text-gray-500">No transactions.</p>
            ) : (
              reportData.transactions.map((tx, i) => (
                <div className="p-3 bg-gray-50 rounded-lg mb-2" key={i}>
                  <p className="font-semibold">{tx.user?.name}</p>
                  <p className="text-sm">{tx.type} - {tx.status}</p>
                </div>
              ))
            )}
          </div>

        </div>
      )}
    </div>
  );
};

export default Reports;
