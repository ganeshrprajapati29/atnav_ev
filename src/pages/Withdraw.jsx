import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import * as withdrawalService from '../services/withdrawalService';
import * as userService from '../services/userService';
import { DollarSign, Banknote, Smartphone, History, Check, X, AlertCircle, Eye, EyeOff, ChevronDown, ChevronUp } from 'lucide-react';

const Withdraw = () => {
  const { user } = useAuth();
  const [withdrawals, setWithdrawals] = useState([]);
  const [bankDetails, setBankDetails] = useState({
    accountHolderName: '',
    accountNumber: '',
    ifsc: '',
    bankName: '',
    upiId: ''
  });
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [showBankForm, setShowBankForm] = useState(false);
  const [maskAccount, setMaskAccount] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchWithdrawals();
    if (user?.bankDetails) {
      setBankDetails(user.bankDetails);
    }
  }, [user]);

  const fetchWithdrawals = async () => {
    try {
      const data = await withdrawalService.getWithdrawals();
      setWithdrawals(data);
    } catch (error) {
      console.error('Failed to fetch withdrawals:', error);
      setErrorMessage('Failed to load withdrawal history');
    }
  };

  const handleBankDetailsSubmit = async (e) => {
    e.preventDefault();
    
    if (!bankDetails.accountHolderName || !bankDetails.accountNumber || !bankDetails.ifsc || !bankDetails.bankName) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage('');
      await userService.updateBankDetails(bankDetails);
      setSuccessMessage('Bank details updated successfully!');
      setShowBankForm(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage(error.message || 'Failed to update bank details');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawalSubmit = async (e) => {
    e.preventDefault();
    const amount = parseInt(withdrawalAmount);

    setErrorMessage('');

    if (!withdrawalAmount || amount <= 0) {
      setErrorMessage('Please enter a valid amount');
      return;
    }

    if (amount < 500) {
      setErrorMessage('Minimum withdrawal amount is 500 coins');
      return;
    }

    if (amount > (user?.totalCoins || 0)) {
      setErrorMessage('Insufficient coins for this withdrawal');
      return;
    }

    if (!bankDetails.accountNumber || !bankDetails.ifsc) {
      setErrorMessage('Please update your bank details first');
      return;
    }

    const confirmWithdraw = window.confirm(
      `Withdraw ${amount} coins to ${bankDetails.bankName}?\nAccount: ****${bankDetails.accountNumber.slice(-4)}`
    );

    if (!confirmWithdraw) return;

    try {
      setLoading(true);
      await withdrawalService.createWithdrawal({
        amount,
        bankDetails
      });
      setSuccessMessage('Withdrawal request submitted successfully!');
      setWithdrawalAmount('');
      setTimeout(() => {
        setSuccessMessage('');
        fetchWithdrawals();
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message || 'Failed to submit withdrawal request');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'SUCCESS': { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: Check },
      'FAILED': { bg: 'bg-red-100', text: 'text-red-700', icon: X },
      'APPROVED': { bg: 'bg-blue-100', text: 'text-blue-700', icon: Check },
      'PENDING': { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: AlertCircle },
      'PROCESSING': { bg: 'bg-purple-100', text: 'text-purple-700', icon: AlertCircle },
    };
    
    const config = statusConfig[status] || statusConfig['PENDING'];
    const IconComponent = config.icon;

    return (
      <div className={`inline-flex items-center gap-1 ${config.bg} ${config.text} px-3 py-1 rounded-full text-sm font-semibold`}>
        <IconComponent size={16} />
        {status}
      </div>
    );
  };

  const formatAccountNumber = (account) => {
    return maskAccount ? `****${account.slice(-4)}` : account;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Withdraw Funds</h1>
          <p className="text-lg text-gray-600">Convert your coins to cash and transfer to your bank account</p>
        </div>

        {/* Success & Error Messages */}
        {successMessage && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3">
            <Check className="text-emerald-600 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-emerald-700 font-medium">{successMessage}</p>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 justify-between">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-red-700 font-medium">{errorMessage}</p>
            </div>
            <button
              onClick={() => setErrorMessage('')}
              className="text-red-600 hover:text-red-700"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Coin Balance Info */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-3xl">
                💰
              </div>
              <div>
                <p className="text-sm opacity-90 font-medium">Available Coins</p>
                <p className="text-4xl font-bold">{user?.totalCoins || 0}</p>
                <p className="text-sm opacity-80 mt-1">Minimum withdrawal: 500 coins</p>
              </div>
            </div>
            <DollarSign size={40} className="opacity-30" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Withdrawal Form */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <DollarSign className="text-emerald-600" size={28} />
              Request Withdrawal
            </h2>

            {/* Bank Details Section */}
            <div className="mb-8">
              <button
                onClick={() => setShowBankForm(!showBankForm)}
                className="w-full flex items-center justify-between p-4 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors font-semibold text-gray-900 mb-4"
              >
                <div className="flex items-center gap-2">
                  <Banknote className="text-emerald-600" size={20} />
                  Bank Details
                </div>
                {showBankForm ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {showBankForm ? (
                <form onSubmit={handleBankDetailsSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Account Holder Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                      value={bankDetails.accountHolderName}
                      onChange={(e) => setBankDetails({...bankDetails, accountHolderName: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Account Number
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                      value={bankDetails.accountNumber}
                      onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      IFSC Code
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all uppercase"
                      value={bankDetails.ifsc}
                      onChange={(e) => setBankDetails({...bankDetails, ifsc: e.target.value.toUpperCase()})}
                      placeholder="e.g., SBIN0001234"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                      value={bankDetails.bankName}
                      onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      UPI ID (Optional)
                    </label>
                    <div className="flex items-center gap-2">
                      <Smartphone className="text-emerald-600" size={20} />
                      <input
                        type="text"
                        className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                        value={bankDetails.upiId}
                        onChange={(e) => setBankDetails({...bankDetails, upiId: e.target.value})}
                        placeholder="yourname@upi"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <Check size={20} />
                        <span>Update Bank Details</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
                  {bankDetails.accountNumber ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Account Holder</p>
                          <p className="font-semibold text-gray-900">{bankDetails.accountHolderName}</p>
                        </div>
                        <Check className="text-emerald-600" size={20} />
                      </div>
                      <div className="border-t border-gray-200 pt-3">
                        <p className="text-sm text-gray-600">Account Number</p>
                        <p className="font-semibold text-gray-900 flex items-center justify-between">
                          {formatAccountNumber(bankDetails.accountNumber)}
                          <button
                            type="button"
                            onClick={() => setMaskAccount(!maskAccount)}
                            className="text-emerald-600 hover:text-emerald-700"
                          >
                            {maskAccount ? <Eye size={16} /> : <EyeOff size={16} />}
                          </button>
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                        <div>
                          <p className="text-sm text-gray-600">Bank</p>
                          <p className="font-semibold text-gray-900">{bankDetails.bankName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">IFSC</p>
                          <p className="font-semibold text-gray-900">{bankDetails.ifsc}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <AlertCircle className="mx-auto text-yellow-600 mb-2" size={32} />
                      <p className="text-gray-600 font-medium">No bank details saved</p>
                      <p className="text-sm text-gray-500 mt-1">Click the button above to add your bank details</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Withdrawal Amount */}
            <form onSubmit={handleWithdrawalSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Withdrawal Amount (Coins)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 text-emerald-600" size={20} />
                  <input
                    type="number"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                    min="500"
                    max={user?.totalCoins || 0}
                    placeholder="Minimum 500 coins"
                    required
                  />
                </div>
                <div className="mt-3 space-y-1">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Available:</span> {user?.totalCoins || 0} coins
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Minimum:</span> 500 coins
                  </p>
                  {withdrawalAmount && (
                    <p className="text-sm text-emerald-600 font-semibold">
                      Remaining after withdrawal: {(user?.totalCoins || 0) - parseInt(withdrawalAmount)} coins
                    </p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                disabled={loading || !bankDetails.accountNumber}
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <DollarSign size={20} />
                    <span>Request Withdrawal</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Withdrawal History */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <History className="text-emerald-600" size={28} />
              Withdrawal History
            </h2>

            {withdrawals.length > 0 ? (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {withdrawals.map((withdrawal) => (
                  <div key={withdrawal._id} className="border-2 border-gray-200 rounded-lg p-5 hover:border-emerald-300 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                          <DollarSign className="text-emerald-600" size={24} />
                          {withdrawal.amount}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {new Date(withdrawal.createdAt).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      {getStatusBadge(withdrawal.status)}
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg space-y-2 border border-gray-200">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Bank:</span> {withdrawal.bankDetails.bankName}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Account:</span> ****{withdrawal.bankDetails.accountNumber.slice(-4)}
                      </p>
                      {withdrawal.bankDetails.upiId && (
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">UPI:</span> {withdrawal.bankDetails.upiId}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <History size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-600 font-medium mb-2">No withdrawal requests yet</p>
                <p className="text-sm text-gray-500">Your withdrawal history will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;