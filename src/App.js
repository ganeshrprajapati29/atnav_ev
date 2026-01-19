import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';

import Loader from './components/Loader';
import ProtectedRoute from './components/ProtectedRoute';
import UserLayout from './components/UserLayout';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Rewards from './pages/Rewards';
import Services from './pages/Services';
import Leaderboard from './pages/Leaderboard';
import Referrals from './pages/Referrals';
import Payment from './pages/Payment';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import TermsPrivacy from './pages/TermsPrivacy';
import QRScanner from './pages/QRScanner';
import KYC from './pages/KYC';

import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import Users from './admin/Users';
import AddUser from './admin/AddUser';
import UserDetails from './admin/UserDetails';
import Transactions from './admin/Transactions';
import Settings from './admin/Settings';
import Analytics from './admin/Analytics';
import Logs from './admin/Logs';
import SystemInfo from './admin/SystemInfo';
import Notifications from './admin/Notifications';
import Withdrawals from './admin/Withdrawals';
import ServicesAdmin from './admin/ServicesAdmin';
import RewardsAdmin from './admin/RewardsAdmin';
import Reports from './admin/Reports';
import KYCAdmin from './admin/KYCAdmin';

import './styles/global.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <AuthProvider>
        <AppProvider>

          {/* ToastContainer always outside flex containers */}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

          <div className="min-h-screen flex flex-col">
            <main className="flex-grow">
              <Routes>

                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/terms-privacy" element={<TermsPrivacy />} />
                <Route path="/qr-scanner" element={<QRScanner />} />
                <Route path="/dashboard" element={<Navigate to="/user/dashboard" replace />} />
                <Route path="/profile" element={<Navigate to="/user/profile" replace />} />
                <Route path="/kyc" element={<Navigate to="/user/kyc" replace />} />
                <Route path="/rewards" element={<Navigate to="/user/rewards" replace />} />
                <Route path="/referrals" element={<Navigate to="/user/referrals" replace />} />

                {/* User Protected Routes */}
                <Route
                  path="/user"
                  element={
                    <ProtectedRoute>
                      <UserLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="kyc" element={<KYC />} />
                  <Route path="rewards" element={<Rewards />} />
                  <Route path="services" element={<Services />} />
                  <Route path="referrals" element={<Referrals />} />
                  <Route path="leaderboard" element={<Leaderboard />} />
                </Route>

                {/* Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="users" element={<Users />} />
                  <Route path="add-user" element={<AddUser />} />
                  <Route path="user-details" element={<UserDetails />} />
                  <Route path="kyc" element={<KYCAdmin />} />
                  <Route path="transactions" element={<Transactions />} />
                  <Route path="withdrawals" element={<Withdrawals />} />
                  <Route path="services" element={<ServicesAdmin />} />
                  <Route path="rewards" element={<RewardsAdmin />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="logs" element={<Logs />} />
                  <Route path="system-info" element={<SystemInfo />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="settings" element={<Settings />} />
                </Route>

              </Routes>
            </main>
          </div>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
