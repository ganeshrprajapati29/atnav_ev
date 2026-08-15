import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { createPaymentOrder } from "../services/authService";
import { AlertCircle, CreditCard, MessageCircle, QrCode, Send } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

const UPI_ID = "ciborigroup01@fbl";
const WHATSAPP = "9953701057";

const Payment = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [upiPaymentStarted, setUpiPaymentStarted] = useState(false);
  const [submitted, setSubmitted] = useState(null);
  const [utrNumber, setUtrNumber] = useState("");

  const amount = parseInt(searchParams.get("amount"), 10) || 100;
  const coins = amount / 10;
  const dailyGrowth = ((amount * 0.05) / 365).toFixed(4);

  const submitPaymentRequest = async () => {
    try {
      setLoading(true);
      const data = await createPaymentOrder(amount, utrNumber);
      setSubmitted(data);
      alert("Payment request submitted. Admin approval ke baad coins balance me add honge.");
    } catch (error) {
      alert(error.response?.data?.message || "Payment request submit nahi ho paya.");
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-3xl font-bold text-emerald-700 mb-2">Buy Coins</h1>
          <p className="text-gray-600">Manual UPI payment approval</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="mb-6 p-4 bg-emerald-50 rounded-lg">
            <h3 className="font-semibold text-emerald-800 mb-2">Account Details</h3>
            <p className="text-sm text-emerald-700"><strong>Name:</strong> {user?.name}</p>
            <p className="text-sm text-emerald-700"><strong>Email:</strong> {user?.email}</p>
            <p className="text-sm text-emerald-700"><strong>User ID:</strong> {user?.uniqueId}</p>
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-3xl font-bold text-gray-900">₹{amount}</p>
            <p className="text-sm text-gray-600 mt-1">{coins} coins after approval</p>
            <p className="text-xs text-gray-500">Daily growth: {dailyGrowth} coins</p>
          </div>

          {!upiPaymentStarted && (
            <button
              onClick={() => setUpiPaymentStarted(true)}
              className="w-full p-4 border-2 border-blue-200 rounded-lg hover:border-blue-400 transition-colors flex items-center gap-3 mb-6"
            >
              <QrCode className="text-blue-600" size={24} />
              <div className="text-left">
                <p className="font-semibold text-gray-800">Scan QR and Pay</p>
                <p className="text-sm text-gray-600">Submit request after payment</p>
              </div>
            </button>
          )}

          {upiPaymentStarted && (
            <div className="text-center">
              <h3 className="font-semibold text-gray-800 mb-4">Scan QR Code to Pay</h3>
              <div className="flex justify-center mb-4">
                <QRCodeCanvas
                  value={`upi://pay?pa=${UPI_ID}&pn=CiboriGroup&am=${amount}&cu=INR&tn=Atvan Coin Purchase`}
                  size={210}
                  level="H"
                  includeMargin
                  className="rounded-lg shadow-lg"
                />
              </div>
              <p className="text-sm text-gray-600 mb-4">UPI ID: {UPI_ID}</p>
              <input
                value={utrNumber}
                onChange={(e) => setUtrNumber(e.target.value)}
                placeholder="UTR / transaction number (optional)"
                className="w-full border border-gray-200 rounded-lg px-3 py-3 mb-4"
              />
              <button
                onClick={submitPaymentRequest}
                disabled={loading || submitted}
                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Send size={18} />
                {loading ? "Submitting..." : submitted ? "Request submitted" : "Submit for admin approval"}
              </button>
            </div>
          )}

          <div className="mt-6 p-4 bg-green-50 rounded-lg text-center">
            <MessageCircle className="text-green-600 mx-auto mb-3" size={32} />
            <h3 className="font-semibold text-gray-800 mb-2">Payment Done?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Payment ke baad screenshot WhatsApp karein. Admin approval ke baad coins balance me reflect honge.
            </p>
            <div className="bg-white p-3 rounded-lg">
              <p className="font-mono text-lg font-semibold text-green-600">+91 {WHATSAPP}</p>
              <p className="text-xs text-gray-500">WhatsApp Number</p>
            </div>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg mt-5"
          >
            Go to Home
          </button>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-start gap-2">
            <AlertCircle className="text-blue-600 shrink-0" size={16} />
            <p className="text-sm text-blue-700">
              Balance sirf admin approval ke baad update hoga. Duplicate request avoid karne ke liye payment details carefully submit karein.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
