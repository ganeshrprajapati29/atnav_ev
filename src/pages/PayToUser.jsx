import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import * as userService from '../services/userService';
import { HiUser, HiCurrencyDollar, HiCreditCard, HiArrowLeft, HiCheck } from 'react-icons/hi2';
import { toast } from 'react-toastify';

const PayToUser = ({ isModal = false, onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recipientQuery, setRecipientQuery] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [finding, setFinding] = useState(false);
  const [paying, setPaying] = useState(false);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const handleFindUser = async () => {
    if (!recipientQuery.trim()) {
      toast.error('Please enter user ID or mobile number');
      return;
    }

    setFinding(true);
    try {
      const response = await userService.searchUser(recipientQuery.trim());
      if (response.data.length === 1) {
        setSelectedRecipient(response.data[0]);
      } else if (response.data.length > 1) {
        toast.error('Multiple users found. Please be more specific.');
      } else {
        toast.error('User not found');
        setSelectedRecipient(null);
      }
    } catch (error) {
      toast.error('Error finding user');
      setSelectedRecipient(null);
    } finally {
      setFinding(false);
    }
  };

  const handlePayment = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (parseFloat(amount) > user.totalGold) {
      toast.error('Insufficient gold coins');
      return;
    }

    setPaying(true);
    try {
      const response = await userService.payToUser(selectedRecipient._id, parseFloat(amount), note);
      setTransactionId(response.data.transactionId);
      setShowConfirmModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Payment failed');
    } finally {
      setPaying(false);
    }
  };

  const resetForm = () => {
    setRecipientQuery('');
    setSelectedRecipient(null);
    setAmount('');
    setNote('');
  };

  return (
    <>
      {!isModal && (
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-600 mb-2">Pay to User</h1>
          <p className="text-gray-600">Send coins to another user</p>
        </div>
      )}

      <div className={`${isModal ? '' : 'bg-white rounded-2xl shadow-xl p-8 border border-gray-100'}`}>
          {/* Recipient Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipient (User ID or Mobile Number)
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={recipientQuery}
                onChange={(e) => setRecipientQuery(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Enter user ID or mobile number"
              />
              <button
                onClick={handleFindUser}
                disabled={finding}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                {finding ? 'Finding...' : 'Find User'}
              </button>
            </div>
          </div>

          {selectedRecipient && (
            <>
              {/* Recipient Info */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HiUser size={32} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">{selectedRecipient.name}</h2>
                <p className="text-gray-600">User ID: {selectedRecipient.uniqueId}</p>
                <p className="text-gray-600">Phone: {selectedRecipient.phone}</p>
              </div>

              {/* Payment Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (Gold Coins)
                  </label>
                  <div className="relative">
                    <HiCurrencyDollar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter amount"
                      min="1"
                      step="0.01"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Your balance: {user.totalGold} gold coins
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Note (Optional)
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Add a note..."
                    rows={3}
                  />
                </div>

                <button
                  onClick={() => setShowConfirmModal(true)}
                  disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > user.totalGold}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <HiCreditCard size={20} />
                  Pay {amount || 0} Gold Coins
                </button>
              </div>

              {/* Warning */}
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> This payment is irreversible. Make sure you want to send coins to this user.
                </p>
              </div>
            </>
          )}
        </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiCreditCard size={32} className="text-emerald-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Confirm Payment</h2>
            </div>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Recipient:</span>
                <span className="font-medium">{selectedRecipient.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">{amount} Gold Coins</span>
              </div>
              {note && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Note:</span>
                  <span className="font-medium">{note}</span>
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                disabled={paying}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {paying ? 'Processing...' : 'Confirm Payment'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiCheck size={32} className="text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Payment Successful!</h2>
              <p className="text-gray-600 mt-2">Coins have been sent successfully.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="text-sm text-gray-600">Transaction ID</div>
              <div className="font-mono font-bold text-lg">{transactionId}</div>
            </div>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                resetForm();
                if (isModal) {
                  onClose();
                } else {
                  navigate('/dashboard');
                }
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PayToUser;
