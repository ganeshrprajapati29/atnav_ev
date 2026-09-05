import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AlertCircle, CheckCircle, CreditCard, ShieldCheck } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { createPaymentOrder, verifyPayment } from "../services/authService";

const loadRazorpay = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const Payment = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const amount = parseInt(searchParams.get("amount"), 10) || 100;
  const coins = amount / 10;
  const dailyGrowth = ((amount * 0.05) / 365).toFixed(4);
  const paymentCompleted = user?.serviceActivated || user?.paymentStatus === "completed";

  const startPayment = async () => {
    if (paymentCompleted) {
      alert("Aapka Atvan Coin purchase already completed hai.");
      return;
    }

    try {
      setLoading(true);
      const ready = await loadRazorpay();
      if (!ready) {
        alert("Razorpay checkout load nahi ho paya. Please internet check karke retry karein.");
        return;
      }

      const data = await createPaymentOrder(amount);
      const options = {
        key: data.keyId,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "ATVAN Coin",
        description: `${coins} Atvan Coin`,
        order_id: data.order.id,
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.phone || ""
        },
        notes: {
          purchaseId: data.purchase?._id,
          userId: user?._id,
          coins
        },
        theme: { color: "#087F5B" },
        handler: async (response) => {
          try {
            const verified = await verifyPayment({
              ...response,
              purchaseId: data.purchase?._id
            });
            if (verified.user) updateUser(verified.user);
            setSuccess(verified);
          } catch (error) {
            alert(error.response?.data?.message || "Payment verify nahi ho paya.");
          }
        },
        modal: {
          ondismiss: () => setLoading(false)
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", (response) => {
        alert(response.error?.description || "Payment failed. Please try again.");
        setLoading(false);
      });
      razorpay.open();
    } catch (error) {
      alert(error.response?.data?.message || "Payment start nahi ho paya.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-emerald-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
          <CheckCircle className="mx-auto mb-4 text-emerald-600" size={54} />
          <h1 className="text-2xl font-bold text-gray-900">Payment Successful</h1>
          <p className="mt-2 text-gray-600">Atvan Coin automatically wallet me credit ho gaya hai.</p>
          <div className="mt-5 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-800">
            <p><strong>Atvan Coin:</strong> {success.purchase?.baseCoins || coins}</p>
            <p><strong>Payment ID:</strong> {success.purchase?.razorpayPaymentId || "-"}</p>
          </div>
          <button
            onClick={() => navigate("/user/dashboard")}
            className="mt-6 w-full rounded-xl bg-emerald-600 px-4 py-3 font-bold text-white hover:bg-emerald-700"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-lg bg-emerald-100 shadow-lg">
            <CreditCard className="text-emerald-600" size={32} />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-emerald-700">Buy Atvan Coin</h1>
          <p className="text-gray-600">Secure automatic payment by Razorpay</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
          <div className="mb-6 rounded-lg bg-emerald-50 p-4">
            <h3 className="mb-2 font-semibold text-emerald-800">Account Details</h3>
            <p className="text-sm text-emerald-700"><strong>Name:</strong> {user?.name}</p>
            <p className="text-sm text-emerald-700"><strong>Email:</strong> {user?.email}</p>
            <p className="text-sm text-emerald-700"><strong>User ID:</strong> {user?.uniqueId}</p>
          </div>

          <div className="mb-6 rounded-lg bg-gray-50 p-4 text-center">
            <p className="text-3xl font-bold text-gray-900">Rs.{amount}</p>
            <p className="mt-1 text-sm text-gray-600">Atvan Coin {coins} instant credit after payment</p>
            <p className="text-xs text-gray-500">Daily growth: Atvan Coin {dailyGrowth}</p>
          </div>

          <button
            onClick={startPayment}
            disabled={loading || paymentCompleted}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            <ShieldCheck size={20} />
            {paymentCompleted ? "Payment Completed" : loading ? "Opening Razorpay..." : "Pay Securely"}
          </button>

          <div className="mt-4 flex items-start gap-2 rounded-lg bg-blue-50 p-3">
            <AlertCircle className="shrink-0 text-blue-600" size={16} />
            <p className="text-sm text-blue-700">
              {paymentCompleted
                ? "Aapka Rs.100 Atvan Coin purchase complete hai. Buy option ab disabled rahega."
                : "Payment success ke baad Atvan Coin automatic wallet me add hoga. Manual UTR approval required nahi hai."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
