import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import * as userService from '../services/userService';
import { HiUser, HiEnvelope, HiDevicePhoneMobile, HiCurrencyDollar, HiStar, HiPencil, HiPhoto, HiEye, HiEyeSlash } from 'react-icons/hi2';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    phone: '',
    address: '',
    dob: '',
    gender: ''
  });

  useEffect(() => {
    if (user) {
      setProfileData(user);
      setEditData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
        gender: user.gender || ''
      });
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Profile not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-600 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Profile Header */}
          <div className="text-center mb-8">
            <div className="inline-block mb-4 relative">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                <HiUser size={40} className="text-white" />
              </div>
              {profileData.photoUrl && (
                <button
                  onClick={() => setShowPhoto(!showPhoto)}
                  className="absolute -bottom-2 -right-2 bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-full shadow-lg"
                >
                  {showPhoto ? <HiEyeSlash size={16} /> : <HiEye size={16} />}
                </button>
              )}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{profileData.name}</h2>
            <div className="flex items-center justify-center gap-2 mt-2">
              <HiStar className="text-amber-500" size={20} />
              <span className="text-lg font-semibold text-amber-600">{profileData.tier} Tier</span>
            </div>
            <div className="mt-4 flex justify-center gap-2">
              <button
                onClick={() => setEditing(!editing)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                <HiPencil size={16} />
                {editing ? 'Cancel Edit' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {/* Photo Display */}
          {showPhoto && profileData.photoUrl && (
            <div className="mb-8 text-center">
              <img
                src={profileData.photoUrl}
                alt="Profile Photo"
                className="w-32 h-32 rounded-full mx-auto shadow-lg object-cover"
              />
            </div>
          )}

          {/* Profile Information */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h3>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <HiUser className="text-emerald-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-semibold text-gray-800">{profileData.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <HiEnvelope className="text-emerald-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Email Address</p>
                  <p className="font-semibold text-gray-800">{profileData.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <HiDevicePhoneMobile className="text-emerald-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Phone Number</p>
                  <p className="font-semibold text-gray-800">{profileData.phone}</p>
                </div>
              </div>
            </div>

            {/* Account Statistics */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Account Statistics</h3>

              <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg">
                <HiCurrencyDollar className="text-emerald-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Total Coins</p>
                  <p className="text-2xl font-bold text-emerald-600">{profileData.totalCoins}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <HiStar className="text-blue-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Current Tier</p>
                  <p className="font-semibold text-blue-600">{profileData.tier}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">L</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Login Count</p>
                  <p className="font-semibold text-purple-600">{profileData.loginCount || 0}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Status</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-600">{profileData.totalCoins}</p>
                <p className="text-sm text-gray-600">Total Coins Earned</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{profileData.tier}</p>
                <p className="text-sm text-gray-600">Membership Tier</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{profileData.isAdmin ? 'Admin' : 'User'}</p>
                <p className="text-sm text-gray-600">Account Type</p>
              </div>
            </div>
          </div>

          {/* Last Login */}
          {profileData.lastLogin && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600">
                Last login: {new Date(profileData.lastLogin).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
