import React, { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';

import {
  Home,
  User,
  DollarSign,
  LogOut,
  Users,
  ShieldCheck,
  Menu,
  X,
  History
} from 'lucide-react';

import { useAuth } from '../hooks/useAuth';

const UserLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { path: '/user/dashboard', label: 'Dashboard', icon: Home },
    { path: '/user/profile', label: 'Profile', icon: User },
    { path: '/user/kyc', label: 'KYC Verification', icon: ShieldCheck },
    { path: '/user/rewards', label: 'Rewards', icon: DollarSign },
    { path: '/user/referrals', label: 'Referrals', icon: Users },
    { path: '/user/transactions', label: 'Transaction History', icon: History },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed lg:static z-50 inset-y-0 left-0 w-64 bg-white shadow-lg transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">

          {/* Header */}
          <div className="flex items-center justify-between h-20 px-4 bg-emerald-600 text-white">
            <img
              src="https://i.ibb.co/Xr3fbTmd/IMG-20260116-WA0011.jpg"
              alt="Logo"
              className="w-12 h-12 rounded-lg"
            />

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X size={24} />
            </button>
          </div>

          {/* User Info */}
          <div className="px-4 py-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <User size={20} className="text-emerald-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{user?.name}</p>
                <p className="text-sm text-gray-600">{user?.tier} Tier</p>
              </div>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition
                    ${
                      isActive
                        ? 'bg-emerald-100 text-emerald-700 border-r-4 border-emerald-600'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5 mr-3" /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* Mobile Top Bar */}
        <header className="lg:hidden flex items-center h-16 px-4 bg-white shadow">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <h1 className="ml-4 font-semibold text-gray-800">User Panel</h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default UserLayout;
