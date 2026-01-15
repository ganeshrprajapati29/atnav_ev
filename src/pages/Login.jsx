import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  HiEye,
  HiEyeSlash,
  HiEnvelope,
  HiLockClosed,
  HiArrowRightOnRectangle,
  HiExclamationCircle
} from 'react-icons/hi2';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, loading } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await login(formData.email, formData.password);
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-10 overflow-hidden">

      {/* ---- SVG BACKGROUND SHAPES ---- */}
      <svg className="absolute top-0 left-0 w-[600px] opacity-20" viewBox="0 0 600 600">
        <path fill="#34d399" d="M300,532Q220,624,112,562Q4,500,22,367Q40,234,145,151Q250,68,361,127Q472,186,527,293Q582,400,507,495Q432,590,300,532Z" />
      </svg>

      <svg className="absolute bottom-0 right-0 w-[550px] opacity-20" viewBox="0 0 600 600">
        <path fill="#6ee7b7" d="M300,541Q217,582,137,528Q57,474,78,378Q99,282,137,197Q175,112,262,108Q349,104,441,136Q533,168,540,264Q547,360,477,438Q407,516,300,541Z" />
      </svg>

      {/* ---- CONTENT WRAPPER ---- */}
      <div className="relative w-full max-w-md animate-fadeUp z-10">

        {/* Logo Section */}
        <div className="text-center mb-10">
          <div className="inline-block mb-4 transform hover:scale-110 transition-all">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl flex items-center justify-center shadow-2xl backdrop-blur-xl">
              <span className="text-4xl">💰</span>
            </div>
          </div>

          <h1 className="text-4xl font-extrabold text-emerald-700 tracking-tight drop-shadow-lg">
            atvanev coins
          </h1>
          <p className="text-gray-700 mt-1">Earn Coins. Redeem Rewards. Login Now!</p>
        </div>

        {/* Glass Effect Card */}
        <div className="bg-white/30 backdrop-blur-2xl shadow-2xl rounded-3xl border border-white/40 p-8">

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 shadow">
              <HiExclamationCircle className="text-red-600 flex-shrink-0 mt-0.5" size={22} />
              <p className="text-red-700 font-semibold text-sm">{error}</p>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                Email Address
              </label>
              <div className="relative">
                <HiEnvelope className="absolute left-3 top-3.5 text-emerald-600" size={22} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 border border-white/60 bg-white/60 rounded-xl focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-300 transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                Password
              </label>
              <div className="relative">
                <HiLockClosed className="absolute left-3 top-3.5 text-emerald-600" size={22} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 border border-white/60 bg-white/60 rounded-xl focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-300 transition-all shadow-sm"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-600 hover:text-emerald-700"
                >
                  {showPassword ? <HiEyeSlash size={22} /> : <HiEye size={22} />}
                </button>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-600" />
                <span className="text-sm text-gray-800 font-medium">Remember me</span>
              </label>

              <Link to="/forgot-password" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 rounded-xl transition-all transform hover:scale-[1.03] shadow-xl flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <HiArrowRightOnRectangle size={22} />
                  <span>Login</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white/60 backdrop-blur-md text-gray-600 font-medium">
                New to atvanev coins?
              </span>
            </div>
          </div>

          {/* Signup */}
          <Link
            to="/signup"
            className="block w-full text-center border-2 border-emerald-600 text-emerald-700 font-bold py-3 rounded-xl hover:bg-emerald-50 transition shadow-sm"
          >
            Create an Account
          </Link>

        </div>

        {/* Terms */}
        <p className="mt-6 text-center text-gray-700 text-sm drop-shadow">
          By continuing, you agree to our{' '}
          <Link to="/terms" className="text-emerald-700 font-semibold">Terms</Link> &
          <Link to="/privacy" className="text-emerald-700 font-semibold"> Privacy Policy</Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
