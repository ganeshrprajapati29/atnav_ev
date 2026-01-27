import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';

// FIXED: hi2 ❌ removed, using lucide-react ✔️
import {
  Home,
  Users,
  IdCard,
  ShieldCheck,
  Bolt,
  BarChart3,
  FileText,
  Settings,
  UserPlus,
  LogOut,
  Menu,
  X,
  Edit
} from 'lucide-react';

import { useAuth } from '../hooks/useAuth';

const AdminLayout = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: Home },
    // { path: '/admin/home', label: 'Home Content', icon: Edit },
    { path: '/admin/users', label: 'Users', icon: Users },
    { path: '/admin/add-user', label: 'Add User', icon: UserPlus },
    { path: '/admin/user-details', label: 'User Details', icon: IdCard },
    { path: '/admin/kyc', label: 'KYC Management', icon: ShieldCheck },
    { path: '/admin/transactions', label: 'Transactions', icon: FileText },
    { path: '/admin/rewards', label: 'Rewards', icon: Bolt },
    { path: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/admin/reports', label: 'Reports', icon: BarChart3 },
    { path: '/admin/logs', label: 'Logs', icon: FileText },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
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
            <div className="flex items-center gap-3">
              <img
                src="https://i.ibb.co/Xr3fbTmd/IMG-20260116-WA0011.jpg"
                alt="Logo"
                className="w-10 h-10 rounded-lg"
              />
              <h1 className="text-lg font-bold">ATVAN Admin</h1>
            </div>

            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X size={24} />
            </button>
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
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition
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
              onClick={logout}
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
          <h2 className="ml-4 font-semibold text-gray-800">Admin Panel</h2>
        </header>

        {/* Page */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;
