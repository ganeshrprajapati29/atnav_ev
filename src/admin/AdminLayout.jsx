import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  HiHome,
  HiUsers,
  HiCreditCard,
  HiShoppingCart,
  HiBolt,
  HiArrowLeftOnRectangle,
  HiIdentification,
  HiReceiptPercent,
  HiCog6Tooth,
  HiChartBar,
  HiDocumentText,
  HiServer,
  HiBell,
  HiDocumentChartBar
} from 'react-icons/hi2';
import { useAuth } from '../hooks/useAuth';

const AdminLayout = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: HiHome },
    { path: '/admin/users', label: 'Users', icon: HiUsers },
    { path: '/admin/user-details', label: 'User Details', icon: HiIdentification },
    { path: '/admin/transactions', label: 'Transactions', icon: HiReceiptPercent },
    { path: '/admin/withdrawals', label: 'Withdrawals', icon: HiCreditCard },
    { path: '/admin/services', label: 'Services', icon: HiShoppingCart },
    { path: '/admin/rewards', label: 'Rewards', icon: HiBolt },
    { path: '/admin/analytics', label: 'Analytics', icon: HiChartBar },
    { path: '/admin/reports', label: 'Reports', icon: HiDocumentChartBar },
    { path: '/admin/logs', label: 'Logs', icon: HiDocumentText },
    { path: '/admin/system-info', label: 'System Info', icon: HiServer },
    { path: '/admin/notifications', label: 'Notifications', icon: HiBell },
    { path: '/admin/settings', label: 'Settings', icon: HiCog6Tooth },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">

          {/* Header */}
          <div className="flex items-center justify-center h-16 bg-emerald-600 text-white">
            <h1 className="text-xl font-bold">Admin Panel</h1>
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

export default AdminLayout;
