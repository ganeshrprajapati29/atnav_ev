import React, { useEffect, useState } from 'react';
import { FaCheck, FaEye } from 'react-icons/fa';
import adminService from '../services/adminService';

const Withdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const data = await adminService.getWithdrawals();

      // 🔥 FIX — ALWAYS return array
      setWithdrawals(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch withdrawals:', error);
      setWithdrawals([]); // fallback
    } finally {
      setLoading(false);
    }
  };

  const handleApproveWithdrawal = async (withdrawalId) => {
    if (!window.confirm('Approve this withdrawal? This will initiate payout.')) return;

    try {
      await adminService.approveWithdrawal(withdrawalId);
      alert('Withdrawal approved successfully!');
      fetchWithdrawals();
    } catch (error) {
      alert('Failed to approve withdrawal');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'SUCCESS':
        return 'bg-green-100 text-green-700';
      case 'FAILED':
        return 'bg-red-100 text-red-700';
      case 'APPROVED':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
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
          <p className="text-gray-600 text-lg">Loading Withdrawals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Withdrawal Management</h1>
          <p className="text-lg text-gray-600">
            Review and approve user withdrawal requests
          </p>
        </div>

        {/* Withdrawal List */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-10">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 font-medium text-gray-700">User</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Amount</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Bank Details</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Status</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Date</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>

              <tbody>
                {withdrawals.map((withdrawal) => (
                  <tr key={withdrawal._id} className="border-t">

                    {/* USER INFO */}
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-900">{withdrawal.user?.name}</p>
                      <p className="text-sm text-gray-600">{withdrawal.user?.email}</p>
                    </td>

                    {/* AMOUNT */}
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span className="text-green-600 mr-2 text-xl">💰</span>
                        <span className="font-semibold">{withdrawal.amount} coins</span>
                      </div>
                    </td>

                    {/* BANK */}
                    <td className="px-4 py-3 text-sm">
                      <p>{withdrawal.bankDetails?.bankName}</p>
                      <p>****{withdrawal.bankDetails?.accountNumber.slice(-4)}</p>
                    </td>

                    {/* STATUS */}
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                          withdrawal.status
                        )}`}
                      >
                        {withdrawal.status}
                      </span>
                    </td>

                    {/* DATE */}
                    <td className="px-4 py-3">
                      {new Date(withdrawal.createdAt).toLocaleDateString()}
                    </td>

                    {/* ACTIONS */}
                    <td className="px-4 py-3">
                      <div className="flex space-x-3 text-lg">
                        <button
                          onClick={() => setSelectedWithdrawal(withdrawal)}
                          className="text-blue-600 hover:text-blue-800"
                          title="View Details"
                        >
                          <FaEye />
                        </button>

                        {withdrawal.status === 'PENDING' && (
                          <button
                            onClick={() => handleApproveWithdrawal(withdrawal._id)}
                            className="text-green-600 hover:text-green-800"
                            title="Approve Withdrawal"
                          >
                            <FaCheck />
                          </button>
                        )}
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

        {/* Details Modal */}
        {selectedWithdrawal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg">

              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Withdrawal Details
              </h2>

              <div className="space-y-5">

                {/* User Info */}
                <div>
                  <h3 className="font-semibold text-gray-800">User Information</h3>
                  <p><strong>Name:</strong> {selectedWithdrawal.user?.name}</p>
                  <p><strong>Email:</strong> {selectedWithdrawal.user?.email}</p>
                  <p><strong>Phone:</strong> {selectedWithdrawal.user?.phone}</p>
                </div>

                {/* Withdrawal Info */}
                <div>
                  <h3 className="font-semibold text-gray-800">Withdrawal Details</h3>
                  <p><strong>Amount:</strong> {selectedWithdrawal.amount} coins</p>
                  <p><strong>Status:</strong> {selectedWithdrawal.status}</p>
                  <p>
                    <strong>Date:</strong>{' '}
                    {new Date(selectedWithdrawal.createdAt).toLocaleString()}
                  </p>
                  {selectedWithdrawal.transactionId && (
                    <p><strong>Transaction ID:</strong> {selectedWithdrawal.transactionId}</p>
                  )}
                </div>

                {/* Bank Info */}
                <div>
                  <h3 className="font-semibold text-gray-800">Bank Details</h3>
                  <p>
                    <strong>Account Holder:</strong>{' '}
                    {selectedWithdrawal.bankDetails?.accountHolderName}
                  </p>
                  <p>
                    <strong>Account Number:</strong>{' '}
                    {selectedWithdrawal.bankDetails?.accountNumber}
                  </p>
                  <p><strong>Bank Name:</strong> {selectedWithdrawal.bankDetails?.bankName}</p>
                  <p><strong>IFSC:</strong> {selectedWithdrawal.bankDetails?.ifsc}</p>
                  {selectedWithdrawal.bankDetails?.upiId && (
                    <p><strong>UPI ID:</strong> {selectedWithdrawal.bankDetails?.upiId}</p>
                  )}
                </div>

                {selectedWithdrawal.notes && (
                  <div>
                    <h3 className="font-semibold text-gray-800">Notes</h3>
                    <p>{selectedWithdrawal.notes}</p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setSelectedWithdrawal(null)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-lg font-semibold"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Withdrawals;
