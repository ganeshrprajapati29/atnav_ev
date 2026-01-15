import React, { useEffect } from 'react';

const LoginRewardPopup = ({ coins, onClose }) => {
  useEffect(() => {
    // Auto close after 4 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center shadow-2xl transform animate-bounce">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Celebration emoji */}
        <div className="text-6xl mb-4">🎉</div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Congratulations!
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          You earned <span className="font-bold text-emerald-600 text-lg">{coins} coins</span> for logging in today!
        </p>

        {/* Coins display */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-3xl">💰</span>
          <span className="text-2xl font-bold text-emerald-600">+{coins}</span>
        </div>

        {/* Auto close indicator */}
        <div className="text-xs text-gray-500">
          This popup will close automatically
        </div>
      </div>
    </div>
  );
};

export default LoginRewardPopup;
