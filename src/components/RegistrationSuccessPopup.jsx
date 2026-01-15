import React from 'react';
import { CheckCircle, Home, CreditCard } from 'lucide-react';

const RegistrationSuccessPopup = ({ userId, onGoHome, onMakePayment }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md mx-4">
        <div className="text-center">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
              <CheckCircle className="text-emerald-600" size={32} />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">Registration Successful!</h2>

          <p className="text-gray-600 mb-6">
            Your account has been created successfully. Your unique user ID is:
          </p>

          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
            <p className="text-lg font-mono font-bold text-emerald-800">{userId}</p>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            Complete the payment of ₹100 to activate your service and unlock all features.
          </p>

          <div className="space-y-3">
            <button
              onClick={onGoHome}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Home size={18} />
              Go to Home
            </button>

            <button
              onClick={onMakePayment}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <CreditCard size={18} />
              Make Payment ₹100
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccessPopup;
