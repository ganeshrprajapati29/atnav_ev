import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import * as userService from '../services/userService';
import { HiUser, HiCurrencyDollar, HiCreditCard, HiArrowLeft } from 'react-icons/hi2';
import { toast } from 'react-toastify';

const PayToUser = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    const fetchRecipient = async () => {
      try {
        // Find user by uniqueId
        const response = await userService.getUserByUniqueId(userId);
        setRecipient(response.data);
      } catch (error) {
        toast.error('User not found');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchRecipient();
    }
  }, [userId, navigate]);

  const handlePayment = async (e) => {
    e.preventDefault();

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
      // Create payment transaction
      await userService.payToUser(recipient._id, parseFloat(amount), note);

      toast.success(`Successfully paid ${amount} coins to ${recipient.name}`);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Payment failed');
    } finally {
      setPaying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!recipient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">User not found</p>
          <button
            onClick={() => navigate('/')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
          >
            <HiArrowLeft size={20} />
            Back
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-600 mb-2">Pay to User</h1>
          <p className="text-gray-600">Send coins to another user</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Recipient Info */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiUser size={32} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">{recipient.name}</h2>
            <p className="text-gray-600">User ID: {recipient.uniqueId}</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <HiCurrencyDollar className="text-emerald-600" size={16} />
              <span className="text-sm text-gray-600">Tier: {recipient.tier}</span>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handlePayment} className="space-y-6">
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
                  required
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
              type="submit"
              disabled={paying || !amount || parseFloat(amount) > user.totalGold}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <HiCreditCard size={20} />
              {paying ? 'Processing...' : `Pay ${amount || 0} Gold Coins`}
            </button>
          </form>

          {/* Warning */}
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> This payment is irreversible. Make sure you want to send coins to this user.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayToUser;
