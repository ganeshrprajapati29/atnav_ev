import React, { useEffect, useState } from 'react';
import adminService from '../services/adminService';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await adminService.getTransactions();
      setTransactions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-emerald-600 border-r-emerald-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 text-lg">Loading Transactions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Transaction Management</h1>
          <p className="text-lg text-gray-600">View all transaction records</p>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-10">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 font-medium text-gray-700">Transaction ID</th>
                  <th className="px-4 py-3 font-medium text-gray-700">User Name</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Email</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Unique ID</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Withdrawal Amount</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Transaction Amount</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Status</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Payout ID</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Date</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction._id} className="border-t">

                    {/* Transaction ID */}
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-900">{transaction._id?.slice(-8)}</p>
                    </td>

                    {/* User Name */}
                    <td className="px-4 py-3">
                      <p>{transaction.user?.name || transaction.withdrawal?.user?.name || 'N/A'}</p>
                    </td>

                    {/* Email */}
                    <td className="px-4 py-3">
                      <p className="text-sm">{transaction.user?.email || transaction.withdrawal?.user?.email || 'N/A'}</p>
                    </td>

                    {/* Unique ID */}
                    <td className="px-4 py-3">
                      <p className="text-sm">{transaction.user?.uniqueId || transaction.withdrawal?.user?.uniqueId || 'N/A'}</p>
                    </td>

                    {/* Withdrawal Amount */}
                    <td className="px-4 py-3">
                      <span className="font-semibold">₹{transaction.withdrawal?.amount || transaction.amount}</span>
                    </td>

                    {/* Transaction Amount */}
                    <td className="px-4 py-3">
                      <span className="font-semibold">₹{transaction.amount}</span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          transaction.status === 'SUCCESS'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>

                    {/* Payout ID */}
                    <td className="px-4 py-3">
                      <p className="text-sm">{transaction.payoutId || 'N/A'}</p>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3">
                      <p className="text-sm text-gray-600">
                        {new Date(transaction.createdAt).toLocaleString()}
                      </p>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
