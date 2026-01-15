import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  HiLockClosed,
  HiEye,
  HiEyeSlash,
  HiExclamationCircle,
  HiCheckCircle,
} from "react-icons/hi2";
import { toast } from "react-toastify";
import { resetPassword } from "../services/authService";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await resetPassword(token, formData.password);
      setSuccess(true);
      toast.success("Password reset successful!");

      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS SCREEN ===========
  if (success) {
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

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl flex items-center justify-center shadow-xl text-white">
              <HiCheckCircle size={40} />
            </div>

            <h1 className="text-4xl font-extrabold text-emerald-700 mt-4">
              Password Reset Successful
            </h1>

            <p className="text-gray-700 mt-1">
              Redirecting you to the login page...
            </p>
          </div>

          <div className="bg-white/50 backdrop-blur-xl p-8 rounded-3xl border border-white/60 shadow-2xl text-center">
            <button
              onClick={() => navigate("/login")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-xl font-semibold transition"
            >
              Go to Login Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MAIN FORM ===========
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

      {/* WRAPPER */}
      <div className="w-full max-w-md relative z-10">

        {/* HEADER */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl flex items-center justify-center shadow-xl text-white text-4xl">
            💰
          </div>

          <h1 className="text-4xl font-extrabold text-emerald-700 mt-4 tracking-tight">
            Reset Password
          </h1>

          <p className="text-gray-700">Enter your new password</p>
        </div>

        {/* CARD */}
        <div className="bg-white/40 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/60">

          {/* ERROR */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
              <HiExclamationCircle size={22} className="text-red-600 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* PASSWORD */}
            <div>
              <label className="font-semibold text-gray-900 text-sm mb-1 block">
                New Password
              </label>

              <div className="relative">
                <HiLockClosed
                  size={20}
                  className="absolute left-3 top-3.5 text-emerald-600"
                />

                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  required
                  onChange={handleChange}
                  className="w-full pl-11 pr-12 py-3 rounded-xl bg-white/80 border border-gray-200 focus:ring-2 focus:ring-emerald-300"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-600 hover:text-emerald-700 transition"
                >
                  {showPassword ? <HiEyeSlash size={20} /> : <HiEye size={20} />}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="font-semibold text-gray-900 text-sm mb-1 block">
                Confirm New Password
              </label>

              <div className="relative">
                <HiLockClosed
                  size={20}
                  className="absolute left-3 top-3.5 text-emerald-600"
                />

                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-11 pr-12 py-3 rounded-xl bg-white/80 border border-gray-200 focus:ring-2 focus:ring-emerald-300"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3.5 text-gray-600 hover:text-emerald-700 transition"
                >
                  {showConfirmPassword ? <HiEyeSlash size={20} /> : <HiEye size={20} />}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:scale-[1.03] transition-all text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Resetting...
                </>
              ) : (
                <>
                  <HiLockClosed size={20} />
                  Reset Password
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
