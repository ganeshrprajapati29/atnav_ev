import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import adminService from '../services/adminService';
import { HiUser, HiEnvelope, HiKey, HiCheck, HiX, HiPencil } from 'react-icons/hi2';

const AdminProfile = () => {
  const { user, updateUser } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [editData, setEditData] = useState({
    name: '',
    email: '',
    uniqueId: ''
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData(user);
      setEditData({
        name: user.name || '',
        email: user.email || '',
        uniqueId: user.uniqueId || ''
      });
      setLoading(false);
    }
  }, [user]);

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const response = await adminService.updateAdminProfile(editData);
      updateUser(response.admin);
      setProfileData(response.admin);
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      alert(error.response?.data?.message || error.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    setChangingPassword(true);
    try {
      await adminService.updateAdminProfile({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      setShowPasswordModal(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      alert('Password changed successfully!');
    } catch (error) {
      alert(error.response?.data?.message || error.message || 'Password change failed');
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-emerald-600 border-r-emerald-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 text-lg">Loading Profile...</p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600">Profile not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-10">
      <div className="max-w-4xl mx-auto px-4">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Admin Profile</h1>
          <p className="text-lg text-gray-600 mt-2">
            Manage your admin account settings
          </p>
        </div>

        {/* PROFILE CARD */}
        <div className="bg-white rounded-xl shadow-md p-8">

          {/* HEADER SECTION */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-xl">
              <HiUser size={40} />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-3">{profileData.name}</h2>
            <p className="text-gray-600">Administrator</p>

            <div className="flex gap-4 justify-center mt-6">
              <button
                onClick={() => setEditing(!editing)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2"
              >
                <HiPencil size={16} />
                {editing ? "Cancel Edit" : "Edit Profile"}
              </button>

              <button
                onClick={() => setShowPasswordModal(true)}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2"
              >
                <HiKey size={16} />
                Change Password
              </button>
            </div>

            {editing && (
              <button
                onClick={handleSaveProfile}
                disabled={saving}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50 flex items-center gap-2 mx-auto"
              >
                <HiCheck size={16} />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            )}
          </div>

          {/* PROFILE FIELDS */}
          <div className="grid md:grid-cols-1 gap-6">

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="text-sm text-gray-600">Full Name</label>
                {editing ? (
                  <input
                    type="text"
                    className="w-full mt-1 border px-3 py-2 rounded-lg"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    required
                  />
                ) : (
                  <p className="font-semibold text-gray-800">{profileData.name}</p>
                )}
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="text-sm text-gray-600">Email Address</label>
                {editing ? (
                  <input
                    type="email"
                    className="w-full mt-1 border px-3 py-2 rounded-lg"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    required
                  />
                ) : (
                  <p className="font-semibold text-gray-800 flex items-center gap-2">
                    <HiEnvelope size={16} />
                    {profileData.email}
                  </p>
                )}
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="text-sm text-gray-600">Admin ID</label>
                {editing ? (
                  <input
                    type="text"
                    className="w-full mt-1 border px-3 py-2 rounded-lg"
                    value={editData.uniqueId}
                    onChange={(e) => setEditData({ ...editData, uniqueId: e.target.value })}
                    required
                  />
                ) : (
                  <p className="font-semibold text-gray-800">{profileData.uniqueId}</p>
                )}
              </div>

              <div className="p-4 bg-emerald-50 rounded-lg">
                <label className="text-sm text-gray-600">Account Status</label>
                <p className="font-semibold text-emerald-600">Active Administrator</p>
              </div>
            </div>
          </div>

        </div>

        {/* PASSWORD CHANGE MODAL */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">

              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <HiKey size={24} />
                Change Password
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="font-medium text-gray-700">Current Password</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    placeholder="Enter current password"
                    className="w-full mt-1 border px-3 py-2 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="font-medium text-gray-700">New Password</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    placeholder="Enter new password"
                    className="w-full mt-1 border px-3 py-2 rounded-lg"
                    minLength={6}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Password must be at least 6 characters long
                  </p>
                </div>

                <div>
                  <label className="font-medium text-gray-700">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                    className="w-full mt-1 border px-3 py-2 rounded-lg"
                    minLength={6}
                    required
                  />
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleChangePassword}
                    disabled={changingPassword}
                    className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 disabled:opacity-50"
                  >
                    {changingPassword ? "Changing..." : "Change Password"}
                  </button>

                  <button
                    onClick={() => {
                      setShowPasswordModal(false);
                      setPasswordData({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                      });
                    }}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminProfile;
