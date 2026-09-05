import React, { useEffect, useState } from 'react';
import adminService from '../services/adminService';
import { Loader2 } from 'lucide-react';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await adminService.getTransactions();
      const purchaseData = await adminService.getCoinPurchases();
      setTransactions(Array.isArray(data) ? data : []);
      setPurchases(Array.isArray(purchaseData) ? purchaseData : []);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const reviewPurchase = async (id, action) => {
    try {
      if (action === 'approve') {
        await adminService.approveCoinPurchase(id);
      } else {
        await adminService.rejectCoinPurchase(id);
      }
      await fetchTransactions();
    } catch (error) {
      alert(error.response?.data?.message || 'Request update failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-10">
      <div className="max-w-7xl mx-auto px-4">

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Transaction Management</h1>
          <p className="text-lg text-gray-600">Approve coin purchases and view all transaction records</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Coin Purchase Requests</h2>
              <p className="text-sm text-gray-500">₹100 = 10 coins, daily growth = amount x 5% / 365</p>
            </div>
            <button onClick={fetchTransactions} className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold">Refresh</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 font-medium text-gray-700">User</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Amount</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Coins</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Daily Growth</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Payment Ref</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Status</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Date</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((purchase) => (
                  <tr key={purchase._id} className="border-t">
                    <td className="px-4 py-3">
                      <div className="font-semibold">{purchase.user?.name || 'N/A'}</div>
                      <div className="text-xs text-gray-500">{purchase.user?.uniqueId || purchase.user?.email}</div>
                    </td>
                    <td className="px-4 py-3 font-semibold">₹{purchase.amount}</td>
                    <td className="px-4 py-3 font-semibold">{purchase.baseCoins}</td>
                    <td className="px-4 py-3">{Number(purchase.dailyGrowthCoins || 0).toFixed(4)}</td>
                    <td className="px-4 py-3 text-sm">{purchase.razorpayPaymentId || purchase.utrNumber || purchase.razorpayOrderId || '-'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        purchase.status === 'approved' ? 'bg-green-100 text-green-700' :
                        purchase.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {purchase.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{new Date(purchase.createdAt).toLocaleString()}</td>
                    <td className="px-4 py-3">
                      {purchase.status === 'pending' ? (
                        <div className="flex gap-2">
                          <button onClick={() => reviewPurchase(purchase._id, 'approve')} className="px-3 py-1 bg-green-600 text-white rounded text-sm">Approve</button>
                          <button onClick={() => reviewPurchase(purchase._id, 'reject')} className="px-3 py-1 bg-red-600 text-white rounded text-sm">Reject</button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-500">{purchase.certificateNo || '-'}</span>
                      )}
                    </td>
                  </tr>
                ))}
                {purchases.length === 0 && (
                  <tr><td colSpan="8" className="px-4 py-8 text-center text-gray-500">No purchase requests</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

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

                    <td className="px-4 py-3 font-semibold">{transaction._id?.slice(-8)}</td>

                    <td className="px-4 py-3">
                      {transaction.user?.name ||
                        transaction.withdrawal?.user?.name ||
                        'N/A'}
                    </td>

                    <td className="px-4 py-3 text-sm">
                      {transaction.user?.email ||
                        transaction.withdrawal?.user?.email ||
                        'N/A'}
                    </td>

                    <td className="px-4 py-3 text-sm">
                      {transaction.user?.uniqueId ||
                        transaction.withdrawal?.user?.uniqueId ||
                        'N/A'}
                    </td>

                    <td className="px-4 py-3 font-semibold">
                      ₹{transaction.withdrawal?.amount || transaction.amount}
                    </td>

                    <td className="px-4 py-3 font-semibold">₹{transaction.amount}</td>

                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        transaction.status === 'SUCCESS'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-sm">
                      {transaction.payoutId || 'N/A'}
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(transaction.createdAt).toLocaleString()}
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
