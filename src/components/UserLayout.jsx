import React from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import {
  HiHome,
  HiUser,
  HiCurrencyDollar,
  HiGift,
  HiArrowLeftOnRectangle,
  HiUsers,
  HiChartBar
} from 'react-icons/hi2';
import { useAuth } from '../hooks/useAuth';

const UserLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: HiHome },
    { path: '/profile', label: 'Profile', icon: HiUser },
    { path: '/rewards', label: 'Rewards', icon: HiCurrencyDollar },
    { path: '/services', label: 'Services', icon: HiGift },
    { path: '/referrals', label: 'Referrals', icon: HiUsers },
    { path: '/leaderboard', label: 'Leaderboard', icon: HiChartBar },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-center h-16 bg-emerald-600 text-white">
            <h1 className="text-xl font-bold">User Panel</h1>
          </div>

          {/* User Info */}
          <div className="px-4 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <HiUser size={20} className="text-emerald-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{user?.name}</p>
                <p className="text-sm text-gray-600">{user?.tier} Tier</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
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
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <HiArrowLeftOnRectangle className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
