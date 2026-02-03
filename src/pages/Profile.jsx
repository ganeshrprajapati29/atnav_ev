import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import * as userService from '../services/userService';

// ALL ICONS OK
import {
HiUser,
HiEnvelope,
HiDevicePhoneMobile,
HiStar,
HiPencil,
HiCheck,
HiQrCode,
HiShare,
HiArrowDownTray,
} from 'react-icons/hi2';

// ✅ React-19 supported QR import
import { QRCodeCanvas } from "qrcode.react";

// FIXED QR COMPONENT
const ProfessionalQRCode = ({ value, size = 200 }) => {
return ( <div className="relative inline-block"> <QRCodeCanvas
     value={value}
     size={size}
     level="H"
     includeMargin={true}
     className="rounded-lg shadow-lg"
   />


  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-emerald-500">
      <img src="https://i.ibb.co/Xr3fbTmd/IMG-20260116-WA0011.jpg" alt="Logo" className="w-8 h-8 object-contain" />
    </div>
  </div>
</div>


);
};

const Profile = () => {
const { user, updateUser } = useAuth();
const qrRef = useRef();

const [profileData, setProfileData] = useState(null);
const [loading, setLoading] = useState(true);
const [editing, setEditing] = useState(false);
const [saving, setSaving] = useState(false);

const [editData, setEditData] = useState({
name: '',
fatherName: '',
phone: '',
dob: '',
gender: ''
});

useEffect(() => {
if (user) {
setProfileData(user);
setEditData({
name: user.name || '',
fatherName: user.fatherName || '',
phone: user.phone || '',
dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
gender: user.gender || ''
});
setLoading(false);
}
}, [user]);

const handleSaveProfile = async () => {
setSaving(true);
try {
const profileResponse = await userService.updateProfile({
name: editData.name,
fatherName: editData.fatherName,
phone: editData.phone,
dob: editData.dob,
gender: editData.gender
});


  if (!profileResponse || !profileResponse.user) {
    throw new Error('Invalid response from server');
  }

  updateUser(profileResponse.user);
  setProfileData(profileResponse.user);
  setEditing(false);
  alert('Profile updated successfully!');
} catch (error) {
  alert(error.response?.data?.message || error.message || 'Update failed');
} finally {
  setSaving(false);
}


};

const handleShareQR = async () => {
const qrData = JSON.stringify({
type: 'payment',
userId: profileData.uniqueId,
name: profileData.name
});


if (navigator.share) {
  try {
    await navigator.share({
      title: 'Payment QR Code',
      text: `Pay ${profileData.name} using this QR.`,
      url: qrData
    });
  } catch {}
} else {
  navigator.clipboard.writeText(qrData);
  alert('QR data copied to clipboard');
}


};

const handleDownloadQR = () => {
const canvas = qrRef.current.querySelector('canvas');
if (canvas) {
const url = canvas.toDataURL('image/png');
const link = document.createElement('a');
link.href = url;
link.download = `payment-qr-${profileData.uniqueId}.png`;
link.click();
}
};

if (loading) {
return ( <div className="min-h-screen flex items-center justify-center"> <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div> </div>
);
}

if (!profileData) {
return ( <div className="min-h-screen flex items-center justify-center"> <p className="text-gray-600">Profile not found</p> </div>
);
}

return ( <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-12 px-4">


  <div className="max-w-6xl mx-auto">

    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-emerald-600 mb-2">My Profile</h1>
      <p className="text-gray-600">View & manage your details</p>
    </div>

    <div className="bg-white rounded-2xl shadow-xl p-8">

      {/* HEADER */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 mx-auto rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-xl">
          <HiUser size={40} />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mt-3">{profileData.name}</h2>

        <div className="flex items-center justify-center gap-2 mt-2">
          <HiStar className="text-amber-500" size={20} />
          <span className="text-lg font-semibold text-amber-600">
            {profileData.tier} Tier
          </span>
        </div>

        <button
          onClick={() => setEditing(!editing)}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          {editing ? "Cancel Edit" : "Edit Profile"}
        </button>

        {editing && (
          <button
            onClick={handleSaveProfile}
            disabled={saving}
            className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition ml-3 disabled:opacity-50"
          >
            {saving ? "Saving..." : (<span className="flex items-center gap-2"><HiCheck/>Save</span>)}
          </button>
        )}
      </div>

      {/* PROFILE FIELDS */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">

        {/* Left Column */}
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <label className="text-sm text-gray-600">Full Name</label>
            {editing ? (
              <input
                type="text"
                className="w-full mt-1 border p-2 rounded-lg"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              />
            ) : (
              <p className="font-semibold text-gray-800">{profileData.name}</p>
            )}
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <label className="text-sm text-gray-600">Father's Name</label>
            {editing ? (
              <input
                type="text"
                className="w-full mt-1 border p-2 rounded-lg"
                value={editData.fatherName}
                onChange={(e) => setEditData({ ...editData, fatherName: e.target.value })}
              />
            ) : (
              <p className="font-semibold text-gray-800">{profileData.fatherName || "Not provided"}</p>
            )}
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <label className="text-sm text-gray-600">Email</label>
            <p className="font-semibold text-gray-800">{profileData.email}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <label className="text-sm text-gray-600">Phone</label>
            {editing ? (
              <input
                type="text"
                className="w-full mt-1 border p-2 rounded-lg"
                value={editData.phone}
                onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
              />
            ) : (
              <p className="font-semibold text-gray-800">{profileData.phone}</p>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <label className="text-sm text-gray-600">DOB</label>
            {editing ? (
              <input
                type="date"
                className="w-full mt-1 border p-2 rounded-lg"
                value={editData.dob}
                onChange={(e) => setEditData({ ...editData, dob: e.target.value })}
              />
            ) : (
              <p className="font-semibold text-gray-800">
                {profileData.dob ? new Date(profileData.dob).toLocaleDateString() : "Not provided"}
              </p>
            )}
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <label className="text-sm text-gray-600">Gender</label>
            {editing ? (
              <select
                className="w-full mt-1 border p-2 rounded-lg"
                value={editData.gender}
                onChange={(e) => setEditData({ ...editData, gender: e.target.value })}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p className="font-semibold text-gray-800">{profileData.gender || "Not provided"}</p>
            )}
          </div>

          <div className="p-4 bg-emerald-50 rounded-lg">
            <label className="text-sm text-gray-600">Total Coins</label>
            <p className="text-2xl font-bold text-emerald-600">{profileData.totalCoins}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <label className="text-sm text-gray-600">User ID</label>
            <p className="font-semibold text-gray-800">{profileData.uniqueId}</p>
          </div>
        </div>
      </div>

      {/* QR CODE SECTION */}
      <div className="mt-10 p-6 bg-emerald-50 rounded-xl border border-emerald-200">
        <h3 className="text-xl font-semibold text-gray-800 text-center flex items-center justify-center gap-2">
          <HiQrCode />
          Payment QR Code
        </h3>

        <div ref={qrRef} className="flex justify-center my-6">
          <ProfessionalQRCode
            value={JSON.stringify({
              type: "payment",
              userId: profileData.uniqueId,
              name: profileData.name
            })}
          />
        </div>

        <p className="text-center text-gray-600 text-sm">
          User ID: {profileData.uniqueId}
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleShareQR}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
          >
            <HiShare size={16} /> Share
          </button>

          <button
            onClick={handleDownloadQR}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold"
          >
            <HiArrowDownTray size={16} /> Download
          </button>
        </div>
      </div>

    </div>

  </div>

</div>


);
};

export default Profile;
