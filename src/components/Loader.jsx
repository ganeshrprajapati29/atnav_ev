import React from 'react';

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      <div className="text-center">

        {/* Animated Loader Circle with Image */}
        <div className="relative inline-block mb-6">
          {/* Outer spinning ring */}
          <div className="h-24 w-24 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>

          {/* Image inside loader */}
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/5359dd66658607.5b1e099b73523.gif"
            alt="Loading"
            className="w-14 h-14 rounded-xl object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md"
          />
        </div>

        {/* Text */}
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Loading...</h2>
        <p className="text-gray-600">Preparing your rewards experience</p>
      </div>
    </div>
  );
};

export default Loader;
