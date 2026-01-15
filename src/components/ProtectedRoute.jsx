import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// 🔥 SAFE LUCIDE ICONS (NO ERROR EVER)
import { Lock, AlertCircle } from 'lucide-react';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setShowMessage(true);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate('/login', { replace: true });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [loading, user, navigate]);

  // Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block mb-6">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-emerald-600 border-r-emerald-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading...</h2>
          <p className="text-gray-600">Please wait while we verify your access</p>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-white px-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full border-l-4 border-emerald-600">
          <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
            <Lock className="text-red-600" size={24} />
          </div>

          <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">Access Denied</h1>

          <p className="text-gray-600 text-center mb-6">
            You need to be logged in to access this page.
            {showMessage && ` Redirecting in ${countdown} seconds...`}
          </p>

          <button
            onClick={() => navigate('/login', { replace: true })}
            className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg text-center transition-colors mb-3"
          >
            Go to Login Now
          </button>

          <button
            onClick={() => navigate('/')}
            className="block w-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-bold py-3 px-4 rounded-lg text-center transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Admin Only
  if (adminOnly && !user.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white px-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full border-l-4 border-red-600">
          <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
            <AlertCircle className="text-red-600" size={24} />
          </div>

          <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">Admin Only</h1>

          <p className="text-gray-600 text-center mb-6">
            This page is restricted to administrators only.
          </p>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-700">
              <strong>User Role:</strong> {user.tier || 'Standard User'}
            </p>
          </div>

          <button
            onClick={() => navigate('/dashboard')}
            className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg text-center transition-colors mb-3"
          >
            Go to Dashboard
          </button>

          <button
            onClick={() => navigate('/')}
            className="block w-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-bold py-3 px-4 rounded-lg text-center transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
