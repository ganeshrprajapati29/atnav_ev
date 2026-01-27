import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AppContext } from "../context/AppContext";
import { transferCoins } from "../services/userService";
import PayToUser from "./PayToUser";
import { QRCodeCanvas } from "qrcode.react";

import {
TrendingUp,
Send,
QrCode,
Download,
AlertCircle,
Zap,
Share,
} from "lucide-react";

// FIXED QR COMPONENT
const ProfessionalQRCode = ({ value, size = 200 }) => {
return ( <div className="relative inline-block"> <QRCodeCanvas
     value={value}
     size={size}
     level="H"
     includeMargin={true}
     className="rounded-lg shadow-lg"
   />

```
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-emerald-500">
      <span className="text-2xl">💰</span>
    </div>
  </div>
</div>


);
};

const Dashboard = () => {
const navigate = useNavigate();
const { user, updateUser } = useAuth();
const { loading, fetchDashboardData } = React.useContext(AppContext);
const qrRef = useRef();

const [showTransferModal, setShowTransferModal] = useState(false);
const [showQRModal, setShowQRModal] = useState(false);
const [showPayToUserModal, setShowPayToUserModal] = useState(false);
const [showReceiveQRModal, setShowReceiveQRModal] = useState(false);
const [transferLoading, setTransferLoading] = useState(false);

const [transferData, setTransferData] = useState({
recipientId: "",
amount: "",
});

useEffect(() => {
fetchDashboardData();
}, [fetchDashboardData]);

if (loading) {
return (
  <div className="h-screen flex justify-center items-center">
    <span className="text-xl font-semibold">Loading Dashboard...</span>
  </div>
);
}

const isActive = user?.serviceActivated;

const handleTransferCoins = async () => {
  if (!transferData.recipientId || !transferData.amount) {
    alert("Please fill all fields");
    return;
  }

  if (parseInt(transferData.amount) > user.totalCoins) {
    alert("Insufficient Coins");
    return;
  }

  try {
    setTransferLoading(true);

    await transferCoins(
      transferData.recipientId,
      parseInt(transferData.amount)
    );

    updateUser({
      ...user,
      totalCoins: user.totalCoins - parseInt(transferData.amount),
    });

    setShowTransferModal(false);
    setTransferData({ recipientId: "", amount: "" });
    alert("Coins sent successfully!");
    fetchDashboardData();
  } catch {
    alert("Transfer failed");
  } finally {
    setTransferLoading(false);
  }
};

const handleShareQR = async () => {
  const qrData = JSON.stringify({
    type: 'payment',
    userId: user.uniqueId,
    name: user.name
  });

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Payment QR Code',
        text: `Pay ${user.name} using this QR.`,
        url: qrData
      });
    } catch {}
  } else {
    navigator.clipboard.writeText(qrData);
    alert('QR data copied to clipboard');
  }
};

const handleDownloadQR = () => {
  const canvas = qrRef.current.querySelector('canvas');
  if (canvas) {
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = `payment-qr-${user.uniqueId}.png`;
    link.click();
  }
};

return (
  <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-6 px-4">
    {/* Activation Banner */}
    {!isActive && (
      <div className="bg-orange-50 border border-orange-200 p-5 rounded-xl mb-6 flex justify-between items-center flex-wrap">
        <div className="flex gap-3 items-center">
          <AlertCircle className="text-orange-600" size={28} />
          <div>
            <h3 className="font-semibold text-orange-800">Service Not Activated</h3>
            <p className="text-orange-700 text-sm">Pay ₹100 to unlock features.</p>
          </div>
        </div>

        <button
          onClick={() => navigate("/payment")}
          className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg mt-3 md:mt-0"
        >
          Pay ₹100
        </button>
      </div>
    )}

    {/* HEADER */}
    <h1 className="text-3xl font-bold mb-6">Welcome back, {user?.name}! 👋</h1>

    {/* Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <div className="bg-white rounded-xl shadow-lg p-7 border-l-4 border-emerald-600">
        <p className="text-sm text-gray-600 font-medium">Total Wallet Coins</p>
        <div className="flex items-center justify-between mt-2">
          <h2 className="text-4xl font-extrabold text-emerald-600">{user?.totalCoins}</h2>
          <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center text-3xl">💰</div>
        </div>
        <p className="text-xs text-gray-500 mt-2">Available to use</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-7 border-l-4 border-amber-500">
        <p className="text-sm text-gray-600 font-medium">Current Tier</p>
        <div className="flex items-center justify-between mt-2">
          <h2 className="text-4xl font-extrabold text-amber-600">{user?.tier}</h2>
          <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center text-3xl">
            {user?.tier === "Platinum" ? "💎" : user?.tier === "Gold" ? "🥇" : "🥈"}
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">Member</p>
      </div>
    </div>

    {/* Quick Actions */}
    <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="text-emerald-600" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">Quick Actions</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <button
          onClick={() => navigate("/rewards")}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-xl text-lg flex items-center justify-center gap-3"
        >
          <TrendingUp size={22} />
          View Rewards
        </button>

        <button
          onClick={() => setShowPayToUserModal(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-xl text-lg flex items-center justify-center gap-3"
        >
          <Send size={22} />
          Send Coins
        </button>

        <button
          onClick={() => setShowReceiveQRModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl text-lg flex items-center justify-center gap-3"
        >
          <Download size={22} />
          Receive Coins
        </button>

        <button
          onClick={() => navigate("/qr-scanner")}
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 rounded-xl text-lg flex items-center justify-center gap-3"
        >
          <QrCode size={22} />
          Scan QR to Pay
        </button>
      </div>
    </div>

    {/* Transfer Modal */}
    {showTransferModal && (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4">Send Coins</h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Recipient ID"
              value={transferData.recipientId}
              onChange={(e) =>
                setTransferData({ ...transferData, recipientId: e.target.value })
              }
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="number"
              placeholder="Amount"
              value={transferData.amount}
              onChange={(e) =>
                setTransferData({ ...transferData, amount: e.target.value })
              }
              className="w-full border p-3 rounded-lg"
            />
          </div>

          <button
            onClick={handleTransferCoins}
            className="w-full mt-5 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold"
          >
            {transferLoading ? "Sending..." : "Send Coins"}
          </button>

          <button
            onClick={() => setShowTransferModal(false)}
            className="w-full mt-4 bg-gray-200 py-3 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    )}

    {/* PayToUser Modal */}
    {showPayToUserModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <PayToUser
            isModal={true}
            onClose={() => setShowPayToUserModal(false)}
          />
        </div>
      </div>
    )}

    {/* Receive QR Modal */}
    {showReceiveQRModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Receive Gold Coins</h2>
            <p className="text-gray-600 mb-6">
              Show this QR code to receive payments and get gold coins credited to your wallet.
            </p>

            {/* User QR Code */}
            <div ref={qrRef} className="flex justify-center my-6">
              <ProfessionalQRCode
                value={JSON.stringify({
                  type: "payment",
                  userId: user.uniqueId,
                  name: user.name
                })}
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">User ID:</p>
              <p className="font-mono font-semibold text-lg">{user.uniqueId}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowReceiveQRModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleShareQR}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Share size={16} /> Share
              </button>
              <button
                onClick={handleDownloadQR}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Download size={16} /> Download
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);
};

export default Dashboard;
