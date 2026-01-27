import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import * as userService from '../services/userService';
import { HiArrowLeft, HiArrowUp, HiArrowDown, HiClock } from 'react-icons/hi2';

const TransactionHistory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTransactionHistory();
  }, []);

  const fetchTransactionHistory = async () => {
    try {
      setLoading(true);
      const response = await userService.getTransactionHistory();
      setTransactions(response);
    } catch (error) {
      setError('Failed to load transaction history');
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading transaction history...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchTransactionHistory}
              className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/user')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <HiArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-emerald-600">Transaction History</h1>
              <p className="text-gray-600">View your coin transfer history</p>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <HiClock size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Transactions Yet</h3>
              <p className="text-gray-500">Your coin transfer history will appear here.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {transactions.map((transaction, index) => (
                <div key={transaction._id || index} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full ${
                        transaction.type === 'sent'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-green-100 text-green-600'
                      }`}>
                        {transaction.type === 'sent' ? (
                          <HiArrowUp size={20} />
                        ) : (
                          <HiArrowDown size={20} />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">
                            {transaction.type === 'sent' ? 'Sent to' : 'Received from'}
                          </h3>
                          <span className="text-gray-600">
                            {transaction.otherParty?.name || 'Unknown User'}
                          </span>
                          <span className="text-sm text-gray-500">
                            ({transaction.otherParty?.uniqueId || 'N/A'})
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {formatDate(transaction.createdAt)}
                        </p>
                        {transaction.transactionId && (
                          <p className="text-xs text-gray-400 font-mono">
                            TXN: {transaction.transactionId}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xl font-bold ${
                        transaction.type === 'sent' ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {transaction.type === 'sent' ? '-' : '+'}{transaction.amount} Coins
                      </div>
                      <div className={`text-sm ${
                        transaction.type === 'sent' ? 'text-red-500' : 'text-green-500'
                      }`}>
                        {transaction.type === 'sent' ? 'Sent' : 'Received'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        {transactions.length > 0 && (
          <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {transactions.filter(t => t.type === 'received').length}
                </div>
                <div className="text-sm text-gray-600">Received</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {transactions.filter(t => t.type === 'sent').length}
                </div>
                <div className="text-sm text-gray-600">Sent</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">
                  {transactions.length}
                </div>
                <div className="text-sm text-gray-600">Total Transactions</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
