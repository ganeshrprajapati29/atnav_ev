import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiEnvelope,
  HiArrowLeft,
  HiExclamationCircle,
} from "react-icons/hi2";
import { toast } from "react-toastify";
import { forgotPassword } from "../services/authService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email) {
      setError("Please enter your email address");
      setLoading(false);
      return;
    }

    try {
      await forgotPassword(email);
      setSubmitted(true);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (err) {
      setError(err.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS SCREEN ----------
  if (submitted) {
    return (
      <div className="relative min-h-screen flex items-center justify-center px-6 py-12 overflow-hidden">

        {/* SVG BACKGROUND */}
        <svg className="absolute -top-20 left-0 w-[650px] opacity-25" viewBox="0 0 600 600">
          <path
            fill="#34d399"
            d="M300,532Q220,624,112,562Q4,500,22,367Q40,234,145,151Q250,68,361,127Q472,186,527,293Q582,400,507,495Q432,590,300,532Z"
          />
        </svg>

        <svg className="absolute bottom-0 right-0 w-[650px] opacity-25" viewBox="0 0 600 600">
          <path
            fill="#6ee7b7"
            d="M300,541Q217,582,137,528Q57,474,78,378Q99,282,137,197Q175,112,262,108Q349,104,441,136Q533,168,540,264Q547,360,477,438Q407,516,300,541Z"
          />
        </svg>

        {/* SUCCESS UI */}
        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl flex items-center justify-center shadow-xl text-white">
              <HiEnvelope size={32} />
            </div>
            <h1 className="text-4xl font-extrabold text-emerald-700 mt-4">
              Check Your Email
            </h1>
            <p className="text-gray-700 mt-1">
              We sent a reset link to:
            </p>
            <p className="font-semibold text-gray-900">{email}</p>
          </div>

          {/* Card */}
          <div className="bg-white/40 backdrop-blur-xl p-8 rounded-3xl border border-white/60 shadow-2xl text-center">
            <p className="text-gray-700 mb-6">
              If you don’t find it in your inbox, check your spam folder.<br />
              <span className="font-semibold">The link expires in 10 minutes.</span>
            </p>

            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-800 transition"
            >
              <HiArrowLeft size={18} />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // MAIN FORM ----------
  return (
    <div className="relative min-h-screen flex justify-center items-center px-6 py-12 overflow-hidden">

      {/* SVG BACKGROUND */}
      <svg className="absolute -top-20 left-0 w-[650px] opacity-25" viewBox="0 0 600 600">
        <path
          fill="#34d399"
          d="M300,532Q220,624,112,562Q4,500,22,367Q40,234,145,151Q250,68,361,127Q472,186,527,293Q582,400,507,495Q432,590,300,532Z"
        />
      </svg>

      <svg className="absolute bottom-0 right-0 w-[650px] opacity-25" viewBox="0 0 600 600">
        <path
          fill="#6ee7b7"
          d="M300,541Q217,582,137,528Q57,474,78,378Q99,282,137,197Q175,112,262,108Q349,104,441,136Q533,168,540,264Q547,360,477,438Q407,516,300,541Z"
        />
      </svg>

      {/* FORM WRAPPER */}
      <div className="w-full max-w-md relative z-10">

        {/* LOGO */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl flex items-center justify-center shadow-xl text-white text-4xl">
            💰
          </div>
          <h1 className="text-4xl font-extrabold text-emerald-700 mt-4 tracking-tight">
            Forgot Password
          </h1>
          <p className="text-gray-700">Enter your email to reset your password</p>
        </div>

        {/* GLASS CARD */}
        <div className="bg-white/40 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/60">

          {/* ERROR */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <HiExclamationCircle className="text-red-600 mt-0.5" size={20} />
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Email Address
              </label>
              <div className="relative">
                <HiEnvelope
                  size={20}
                  className="absolute left-3 top-3.5 text-emerald-600"
                />
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 border rounded-xl bg-white/80 border-gray-200 focus:ring-2 focus:ring-emerald-300 outline-none"
                />
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:scale-[1.03] disabled:opacity-60 text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 transition"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  <HiEnvelope size={20} />
                  Send Reset Link
                </>
              )}
            </button>
          </form>

          {/* BACK TO LOGIN */}
          <div className="text-center mt-6">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-800 transition"
            >
              <HiArrowLeft size={18} />
              Back to Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
