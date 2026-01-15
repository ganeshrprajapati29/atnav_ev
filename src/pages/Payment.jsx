import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { createPaymentOrder, verifyPayment } from '../services/authService';
import { CreditCard, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const Payment = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    // Check if user already has completed payment
    if (user?.paymentStatus === 'completed') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handlePayment = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Create payment order
      const orderData = await createPaymentOrder(100);

      // Initialize Razorpay
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_your_key_here', // You'll need to add this to env
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'RewardSystem',
        description: 'Service Activation Payment',
        order_id: orderData.orderId,
        handler: async function (response) {
          setPaymentLoading(true);
          try {
            // Verify payment
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            // Update user locally
            updateUser({ ...user, paymentStatus: 'completed', serviceActivated: true });

            alert('Payment successful! Your service is now activated.');
            navigate('/dashboard');
          } catch (error) {
            alert('Payment verification failed. Please contact support.');
          } finally {
            setPaymentLoading(false);
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone
        },
        theme: {
          color: '#059669'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert('Failed to create payment order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (paymentLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
            <div className="inline-block mb-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <Loader className="text-emerald-600 animate-spin" size={32} />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Verifying Payment...</h2>
            <p className="text-gray-600">Please wait while we verify your payment</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center shadow-lg">
              <CreditCard className="text-emerald-600" size={32} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-emerald-600 mb-2">Complete Payment</h1>
          <p className="text-gray-600">Pay ₹100 to activate your reward system service</p>
        </div>

        {/* Payment Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* User Info */}
          <div className="mb-6 p-4 bg-emerald-50 rounded-lg">
            <h3 className="font-semibold text-emerald-800 mb-2">Account Details</h3>
            <p className="text-sm text-emerald-700"><strong>Name:</strong> {user?.name}</p>
            <p className="text-sm text-emerald-700"><strong>Email:</strong> {user?.email}</p>
            <p className="text-sm text-emerald-700"><strong>User ID:</strong> {user?.uniqueId}</p>
          </div>

          {/* Payment Amount */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-sm text-gray-600 mb-1">Service Activation Fee</p>
            <p className="text-3xl font-bold text-gray-800">₹100</p>
            <p className="text-xs text-gray-500 mt-1">One-time payment</p>
          </div>

          {/* Benefits */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">What you'll get:</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="text-emerald-600" size={16} />
                Full access to reward system
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="text-emerald-600" size={16} />
                Daily login rewards
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="text-emerald-600" size={16} />
                Coin transfer functionality
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="text-emerald-600" size={16} />
                Withdrawal requests
              </li>
            </ul>
          </div>

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 px-4 rounded-lg transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-lg flex items-center justify-center gap-2 mb-4"
          >
            {loading ? (
              <>
                <Loader className="animate-spin" size={20} />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <CreditCard size={20} />
                <span>Pay ₹100 & Activate Service</span>
              </>
            )}
          </button>

          {/* Go to Home Button */}
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>Go to Home</span>
          </button>

          {/* Security Note */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-start gap-2">
            <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={16} />
            <p className="text-sm text-blue-700">
              Your payment is secured with Razorpay. We do not store your payment information.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Need help? Contact our{' '}
            <button
              onClick={() => navigate('/contact')}
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              support team
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
