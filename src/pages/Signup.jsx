import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  AlertCircle,
  CheckCircle
} from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
    referralCode: "",
  });



  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");

  const { register, loading } = useAuth();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      setFormData(prev => ({ ...prev, referralCode: ref }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setError("");
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all required fields");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const passwordStrength = () => {
    let s = 0;
    if (formData.password.length >= 6) s++;
    if (formData.password.length >= 8) s++;
    if (/[A-Z]/.test(formData.password)) s++;
    if (/[0-9]/.test(formData.password)) s++;
    if (/[!@#$%^&*]/.test(formData.password)) s++;
    return s;
  };

  const strengthColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-emerald-500",
    "bg-emerald-600",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => data.append(key, val));

      await register(data);
      // Registration successful, redirect to payment
      window.location.href = "/payment?amount=100";
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center px-6 py-12 overflow-hidden">

      {/* SVG BACKGROUND */}
      <svg className="absolute -top-20 left-0 w-[650px] opacity-25" viewBox="0 0 600 600">
        <path
          fill="#34d399"
          d="M300,532Q220,624,112,562Q4,500,22,367Q40,234,145,151Q250,68,361,127Q472,186,527,293Q582,400,507,495Q432,590,300,532Z"
        />
      </svg>

      <svg className="absolute bottom-0 right-0 w-[630px] opacity-25" viewBox="0 0 600 600">
        <path
          fill="#6ee7b7"
          d="M300,541Q217,582,137,528Q57,474,78,378Q99,282,137,197Q175,112,262,108Q349,104,441,136Q533,168,540,264Q547,360,477,438Q407,516,300,541Z"
        />
      </svg>

      {/* MAIN WRAPPER */}
      <div className="relative w-full max-w-3xl z-10">
        
        {/* HEADER */}
        <div className="text-center mb-10">
          <img
            src="https://i.ibb.co/Xr3fbTmd/IMG-20260116-WA0011.jpg"
            alt="Logo"
            className="w-20 h-20 mx-auto rounded-3xl object-cover shadow-2xl"
          />
          <h1 className="text-4xl font-extrabold text-emerald-700 mt-4">Create Account</h1>
          <p className="text-gray-700">Join the platform & start earning rewards</p>
        </div>

        {/* FORM CARD */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl p-8">



          {/* ERROR */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3 items-start">
              <AlertCircle size={22} className="text-red-600" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* GRID FORM */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* NAME */}
            <div>
              <label className="font-semibold text-gray-900 text-sm">Full Name</label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-3.5 text-emerald-600" size={20} />
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/80 border"
                />
              </div>
            </div>

            {/* FATHER NAME
            <div>
              <label className="font-semibold text-gray-900 text-sm">Father Name</label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-3.5 text-emerald-600" size={20} />
                <input
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  placeholder="Father's Name"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/80 border"
                />
              </div>
            </div> */}

            {/* EMAIL */}
            <div>
              <label className="font-semibold text-gray-900 text-sm">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-3.5 text-emerald-600" size={20} />
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@gmail.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/80 border"
                />
              </div>
            </div>

            {/* PHONE */}
            <div>
              <label className="font-semibold text-gray-900 text-sm">Phone</label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-3.5 text-emerald-600" size={20} />
                <input
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9953701057"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/80 border"
                />
              </div>
            </div>

            {/* REFERRAL */}
            <div>
              <label className="font-semibold text-gray-900 text-sm">Referral Code</label>
              <input
                name="referralCode"
                value={formData.referralCode}
                onChange={handleChange}
                placeholder="Optional"
                className="w-full px-4 py-3 mt-1 rounded-xl bg-white/80 border"
              />
            </div>

            {/* DOB */}
            <div>
              <label className="font-semibold text-gray-900 text-sm">DOB</label>
              <input
                type="date"
                name="dob"
                required
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-1 rounded-xl bg-white/80 border"
              />
            </div>

            {/* GENDER */}
            <div>
              <label className="font-semibold text-gray-900 text-sm">Gender</label>
              <select
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-1 rounded-xl bg-white/80 border"
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>



            {/* PASSWORD */}
            <div>
              <label className="font-semibold text-gray-900 text-sm">Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3.5 text-emerald-600" size={20} />

                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="w-full pl-11 pr-12 py-3 rounded-xl bg-white/80 border"
                />

                <button
                  type="button"
                  className="absolute right-3 top-3.5 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {formData.password && (
                <div className="mt-2 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full ${
                        i < passwordStrength()
                          ? strengthColors[passwordStrength() - 1]
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="font-semibold text-gray-900 text-sm">Confirm Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3.5 text-emerald-600" size={20} />

                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="w-full pl-11 pr-12 py-3 rounded-xl bg-white/80 border"
                />

                <button
                  type="button"
                  className="absolute right-3 top-3.5 text-gray-600"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {formData.confirmPassword && (
                <p
                  className={`text-xs mt-1 ${
                    formData.confirmPassword === formData.password
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {formData.confirmPassword === formData.password
                    ? "✓ Passwords match"
                    : "✗ Passwords do not match"}
                </p>
              )}
            </div>

            {/* SUBMIT BUTTON (FULL WIDTH) */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold rounded-xl shadow-xl hover:scale-[1.03] transition-all flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>

          {/* LOGIN LINK */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-white/50 backdrop-blur-lg text-gray-600">
                Already have an account?
              </span>
            </div>
          </div>

          <Link
            to="/login"
            className="block w-full text-center py-3 border-2 border-emerald-600 text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition"
          >
            Sign In
          </Link>
        </div>

        {/* FOOTER */}
        <p className="text-center mt-6 text-gray-700 text-sm">
          By creating an account, you agree to our{" "}
          <Link to="/terms-privacy?section=terms" className="text-emerald-700 font-bold">
            Terms
          </Link>{" "}
          &{" "}
          <Link to="/terms-privacy?section=privacy" className="text-emerald-700 font-bold">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
