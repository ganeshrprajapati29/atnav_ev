import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { createPaymentOrder, verifyPayment } from "../services/authService";
import { CreditCard, CheckCircle, AlertCircle } from "lucide-react";

const Payment = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
      const orderData = await createPaymentOrder(100);

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
            Pay ₹100 to activate your reward system service
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
            <p className="text-sm text-gray-600 mb-1">
              Service Activation Fee
            </p>
            <p className="text-3xl font-bold text-gray-800">₹100</p>
            <p className="text-xs text-gray-500 mt-1">One-time payment</p>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:cursor-not-allowed text-white font-bold py-4 px-4 rounded-lg transition-all transform hover:scale-105 mb-4"
          >
            <CreditCard size={20} />
            {loading ? "Processing..." : "Pay ₹100 & Activate Service"}
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg"
          >
            Go to Home
          </button>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-start gap-2">
            <AlertCircle className="text-blue-600" size={16} />
            <p className="text-sm text-blue-700">
              Your payment is secured with Razorpay.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
