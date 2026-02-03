import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { createPaymentOrder, verifyPayment } from "../services/authService";
import { CreditCard, CheckCircle, AlertCircle, QrCode, Clock, MessageCircle } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

const Payment = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' or 'razorpay'
  const [upiPaymentStarted, setUpiPaymentStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute timer
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  // Get amount from URL params, default to 100 if not provided
  const amount = parseInt(searchParams.get('amount')) || 100;

  // 🟢 Check ENV key (VERY IMPORTANT)
  console.log("ENV Razorpay Key:", process.env.REACT_APP_RAZORPAY_KEY_ID);

  useEffect(() => {
    if (user?.paymentStatus === "completed") {
      navigate("/dashboard");
      return;
    }

    // 🟢 FORCE LOAD Razorpay script fresh (avoid cache)
    const script = document.createElement("script");
    script.src =
      "https://checkout.razorpay.com/v1/checkout.js?v=" + Date.now();
    script.async = true;
    script.onload = () => {
      console.log("Razorpay Script Loaded ✔");
    };
    script.onerror = () => {
      console.error("Failed to load Razorpay script ❌");
    };
    document.body.appendChild(script);
  }, [user, navigate]);

  // Timer effect for UPI payment
  useEffect(() => {
    let timer;
    if (upiPaymentStarted && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && upiPaymentStarted) {
      setShowWhatsApp(true);
    }
    return () => clearTimeout(timer);
  }, [upiPaymentStarted, timeLeft]);

  // Handle UPI payment start
  const handleUPIPayment = () => {
    setUpiPaymentStarted(true);
    setTimeLeft(60); // Reset timer to 60 seconds
  };

  // Handle manual account activation after payment
  const handleManualActivation = async () => {
    try {
      // Update user status manually
      updateUser({
        ...user,
        paymentStatus: "completed",
        serviceActivated: true,
      });

      alert("Account activated successfully! You now have access to all features.");
      navigate("/dashboard");
    } catch (error) {
      console.error("Activation error:", error);
      alert("Failed to activate account. Please try again.");
    }
  };

  // Check if user is new (paymentStatus pending) - show WhatsApp immediately
  const isNewUser = user?.paymentStatus === "pending";

  // Razorpay payment commented out as per requirements
  /*
  const handlePayment = async () => {
    if (!user) return;

    // 🛑 Stop if ENV not loaded
    if (!process.env.REACT_APP_RAZORPAY_KEY_ID) {
      alert("Razorpay key missing. ENV not loaded.");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Create order
      const orderData = await createPaymentOrder(amount);

      if (!orderData?.orderId) {
        alert("Order creation failed.");
        setLoading(false);
        return;
      }

      console.log("Order Created:", orderData);

      // 2️⃣ Razorpay Options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // 🟢 ENV Key used
        amount: orderData.amount,
        currency: orderData.currency,
        name: "RewardSystem",
        description: "Service Activation Payment",
        order_id: orderData.orderId,

        handler: async function (response) {
          try {
            console.log("Payment Response:", response);

            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount: amount,
            });

            updateUser({
              ...user,
              paymentStatus: "completed",
              serviceActivated: true,
            });

            alert("Payment successful!");
            navigate("/dashboard");
          } catch (error) {
            console.error("Verify Error:", error);
            alert("Payment verification failed.");
          }
        },

        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.phone,
        },

        theme: {
          color: "#059669",
        },

        modal: {
          ondismiss: () => {
            alert("Payment cancelled.");
          },
        },
      };

      // 3️⃣ Open Razorpay Checkout
      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded. Refresh page.");
        setLoading(false);
        return;
      }

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.error("Razorpay Error:", response.error);
        alert("Payment failed. Try again.");
      });

      rzp.open();
    } catch (error) {
      console.error("Init Payment Error:", error);
      alert("Payment initialization failed!");
    }

    setLoading(false);
  };
  */

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center shadow-lg">
              <CreditCard className="text-emerald-600" size={32} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-emerald-600 mb-2">
            Complete Payment
          </h1>
          <p className="text-gray-600">
            Pay ₹{amount}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="mb-6 p-4 bg-emerald-50 rounded-lg">
            <h3 className="font-semibold text-emerald-800 mb-2">
              Account Details
            </h3>
            <p className="text-sm text-emerald-700">
              <strong>Name:</strong> {user?.name}
            </p>
            <p className="text-sm text-emerald-700">
              <strong>Email:</strong> {user?.email}
            </p>
            <p className="text-sm text-emerald-700">
              <strong>User ID:</strong> {user?.uniqueId}
            </p>
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-3xl font-bold text-gray-800">₹{amount}</p>
            <p className="text-xs text-gray-500 mt-1">payment</p>
          </div>

          {/* Payment Method Selection - Only show for existing users */}
          {!upiPaymentStarted && !isNewUser && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Choose Payment Method</h3>
              <div className="space-y-3">
                <button
                  onClick={handleUPIPayment}
                  className="w-full p-4 border-2 border-blue-200 rounded-lg hover:border-blue-400 transition-colors flex items-center gap-3"
                >
                  <QrCode className="text-blue-600" size={24} />
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">UPI Payment</p>
                    <p className="text-sm text-gray-600">Scan QR code to pay</p>
                  </div>
                </button>

                {/* Razorpay commented out */}
                {/* <button
                  onClick={() => setPaymentMethod('razorpay')}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-gray-400 transition-colors flex items-center gap-3"
                >
                  <CreditCard className="text-gray-600" size={24} />
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">Card/Net Banking</p>
                    <p className="text-sm text-gray-600">Pay with Razorpay</p>
                  </div>
                </button> */}
              </div>
            </div>
          )}

          {/* UPI Payment Section */}
          {upiPaymentStarted && !showWhatsApp && (
            <div className="text-center">
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-4">Scan QR Code to Pay</h3>
                <div className="flex justify-center mb-4">
                  <QRCodeCanvas
                    value={`upi://pay?pa=ciborigroup01@fbl&pn=CiboriGroup&am=${amount}&cu=INR&tn=Service Activation`}
                    size={200}
                    level="H"
                    includeMargin={true}
                    className="rounded-lg shadow-lg"
                  />
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  UPI ID: ciborigroup01@fbl
                </p>
                <div className="flex items-center justify-center gap-2 text-orange-600 mb-4">
                  <Clock size={20} />
                  <span className="font-semibold">
                    Time remaining: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Complete payment within 1 minute to activate your account
                </p>
              </div>
            </div>
          )}

          {/* WhatsApp Contact Section */}
          {showWhatsApp && (
            <div className="text-center">
              <div className="mb-6 p-4 bg-green-50 rounded-lg">
                <MessageCircle className="text-green-600 mx-auto mb-3" size={32} />
                <h3 className="font-semibold text-gray-800 mb-2">Payment Completed?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Send your payment screenshot and transaction details to WhatsApp for account activation.
                </p>
                <div className="bg-white p-3 rounded-lg mb-4">
                  <p className="font-mono text-lg font-semibold text-green-600">+91 9876543210</p>
                  <p className="text-xs text-gray-500">WhatsApp Number</p>
                </div>
                <button
                  onClick={handleManualActivation}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  Activate Account (After Payment)
                </button>
              </div>
            </div>
          )}

          {/* Razorpay commented out */}
          {/* {paymentMethod === 'razorpay' && (
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:cursor-not-allowed text-white font-bold py-4 px-4 rounded-lg transition-all transform hover:scale-105 mb-4"
            >
              <CreditCard size={20} />
              {loading ? "Processing..." : `Pay ₹${amount} with Razorpay`}
            </button>
          )} */}

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg"
          >
            Go to Home
          </button>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-start gap-2">
            <AlertCircle className="text-blue-600" size={16} />
            <p className="text-sm text-blue-700">
              Secure payment processing with UPI integration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
