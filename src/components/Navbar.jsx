import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// ✅ SAFE, WORKING ICONS (lucide-react)
import {
  Menu,
  X,
  LogOut,
  User,
  Settings,
  LayoutDashboard,
  Trophy,
  Bolt
} from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoLoading, setLogoLoading] = useState(true);
  const { user, logout } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setLogoLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-emerald-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 group transition">
            {logoLoading ? (
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-300 to-emerald-500 flex items-center justify-center shadow-inner animate-pulse">
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <img
                src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/5359dd66658607.5b1e099b73523.gif"
                className="w-14 h-14 rounded-xl object-cover border border-emerald-200 shadow-sm group-hover:scale-105 transition"
                alt="Logo"
              />
            )}

            <span className="text-2xl font-extrabold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent hidden sm:inline">
              Atvan Ev
            </span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-8">

            <Link to="/dashboard" className="nav-link">
              <LayoutDashboard size={18} /> Dashboard
            </Link>

            <Link to="/services" className="nav-link">
              <Bolt size={18} /> Services
            </Link>

            <Link to="/leaderboard" className="nav-link">
              <Trophy size={18} /> Leaderboard
            </Link>

            {user?.isAdmin && (
              <Link to="/admin" className="nav-link">
                <Settings size={18} /> Admin
              </Link>
            )}
          </div>

          {/* DESKTOP USER */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                {/* Coins */}
                <div className="flex items-center gap-3 bg-emerald-50 px-4 py-2 rounded-xl shadow-sm border border-emerald-200">
                  <span className="text-2xl">💰</span>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Coins</p>
                    <p className="text-xl font-bold text-emerald-600">{user.totalCoins}</p>
                  </div>
                </div>

                {/* Tier */}
                <div className="flex items-center gap-3 bg-amber-50 px-4 py-2 rounded-xl shadow-sm border border-amber-200">
                  <span className="text-md font-bold text-amber-600">{user.tier}</span>
                </div>

                {/* Profile */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Welcome</p>
                    <p className="font-semibold text-gray-900">{user.name}</p>
                  </div>

                  <Link
                    to="/profile"
                    className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-md hover:scale-105 transition"
                  >
                    <User size={20} className="text-white" />
                  </Link>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition flex items-center gap-2 font-medium shadow-sm"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-auth-link">Login</Link>
                <Link to="/signup" className="nav-auth-btn">Sign Up</Link>
              </>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-emerald-50 border-emerald-200 hover:bg-emerald-100 transition"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-emerald-200 shadow-inner py-4 space-y-3 rounded-b-xl">

            <Link to="/dashboard" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
              Dashboard
            </Link>

            <Link to="/services" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
              Services
            </Link>

            <Link to="/leaderboard" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
              Leaderboard
            </Link>

            {user?.isAdmin && (
              <Link to="/admin" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
                Admin
              </Link>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <LogOut size={18} /> Logout
              </button>

            ) : (
              <>
                <Link to="/login" className="mobile-auth-link">Login</Link>
                <Link to="/signup" className="mobile-auth-btn">Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
